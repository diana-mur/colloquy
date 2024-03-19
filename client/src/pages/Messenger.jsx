import { useEffect, useState } from "react"
import { baseUrl } from "../utils/services"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { UserChat } from "../components/chat/UserChat.jsx"

export const Messenger = () => {
    const [chatsList, setChatsList] = useState([])

    const userId = useSelector((state) => state.auth._id)

    useEffect(() => {
        fetch(`${baseUrl}/chats/${userId}`)
            .then(res => res.json())
            .then(json => { setChatsList(json); console.log(json); })
    }, [userId])

    return (
        <>
            <div>
                {
                    chatsList?.map((chat) => (
                        <Link to={`${chat._id}`} key={chat._id}><UserChat chat={chat} user={userId} /></Link>
                    ))
                }
            </div>
        </>
    )
}
