import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { baseUrl, getRequest, postRequest } from "../../utils/services.js"
import { useSelector } from "react-redux"
import { io } from "socket.io-client"
import { Nickname } from "../nick/Nickname.jsx"

export function Chat() {
    const [socket, setSocket] = useState(null)
    const [messagesList, setMessagesList] = useState([])
    const [textMessage, setTextMessage] = useState("")
    const [onlineUsers, setOnlineUsers] = useState([])
    const [newMessage, setNewMessage] = useState(null)
    const [chat, setChat] = useState(null)
    const [recId, setRecId] = useState('')
    const location = useLocation()
    const path = location.pathname.split("/")[2]
    const navigate = useNavigate()

    const userId = useSelector((state) => state.auth._id)

    useEffect(() => {
        fetch(`${baseUrl}/chats/findById/${path}`)
            .then(res => res.json())
            .then(json => setChat(json))
    }, [path])

    useEffect(() => {
        const nick = async () => {
            const recipientId = chat.members.find((id) => id != userId)
            setRecId(recipientId)
        }
        nick()
    }, [chat])

    useEffect(() => {
        const newSocket = io("http://localhost:3000");
        setSocket(newSocket)

        return () => {
            newSocket.disconnect()
        }
    }, [userId])

    // add online users
    useEffect(() => {
        if (socket === null) return
        socket.emit("addNewUser", userId)
        socket.on("getOnlineUsers", (res) => {
            setOnlineUsers(res)
        });

        return () => {
            socket.off("getOnlineUsers")
        };
    }, [socket]);

    // send message
    useEffect(() => {
        if (socket === null) return

        const recipientId = chat?.members.find((id) => id !== userId)


        socket.emit("sendMessage", { ...newMessage, recipientId })
    }, [newMessage]);

    // receive message
    useEffect(() => {
        if (socket === null) return

        socket.on("getMessage", res => {
            if (path !== res.chatId) return
            setMessagesList((prev) => [...prev, res])
        })

        return () => {
            socket.off("getMessage")
        }

    }, [socket]);


    useEffect(() => {
        fetch(`${baseUrl}/messages/${path}`)
            .then(res => res.json())
            .then(json => setMessagesList(json))
    }, [messagesList])

    const sendTextMessage = async (textMessage, senderId, currentChat) => {
        if (!textMessage) return console.log("Сообщение не введено");

        const response = await postRequest(`${baseUrl}/messages/`, {
            chatId: currentChat,
            senderId: senderId,
            text: textMessage
        })

        if (response.error) return console.log("Ошибка отправки сообщения: ", response.error);

        setNewMessage(response)
        setMessagesList(prev => [...prev, response]);
        setTextMessage("")
    }

    return (
        <>
            <p onClick={() => navigate(`../../../user/${recId}`)}><Nickname id={recId} /></p>
            {
                messagesList.map(message => (
                    <div key={message?._id}>{message.text}</div>
                ))
            }
            <input type="text" value={textMessage} onChange={e => setTextMessage(e.target.value)} />
            <button onClick={() => sendTextMessage(textMessage, userId, path)}>Отправить</button>

        </>
    )
}