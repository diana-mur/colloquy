import { useSelector } from "react-redux"
import { baseUrl, getRequest } from "../../utils/services"
import { Link, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { Nickname } from "../nick/Nickname.jsx"

export function MyFriends() {
    const [friends, setFriends] = useState([])
    const userId = useSelector((state) => state.auth._id)
    const navigate = useNavigate()

    useEffect(() => {
        const res = async () => {
            const user = await getRequest(`${baseUrl}/users/find/${userId}`)
            setFriends(user.friendsId)
            console.log(friends);
        }
        res()
    }, [])

    const linkToChat = async (id) => {
        const chat = await getRequest(`${baseUrl}/chats/find/${userId}/${id}`)
        navigate(`../../../messages/${chat._id}`)
        return
    }

    return (
        <>
            {
                friends?.map((user) => (
                    <div>
                        <div>
                            <img src="" alt="аватар" />
                            <h6 onClick={() => navigate(`../../../user/${user}`)}><Nickname id={user} /></h6>
                        </div>
                        <button onClick={() => linkToChat(user)}>написать</button>
                    </div>
                ))
            }
            {
                friends.length == 0 && <div>В данном списке еще нет пользователей.</div>
            }
        </>
    )
}