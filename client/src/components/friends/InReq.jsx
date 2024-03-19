import { useSelector } from "react-redux"
import { baseUrl, getRequest } from "../../utils/services"
import { useEffect, useState } from "react"
import { Nickname } from "../nick/Nickname.jsx"
import { useNavigate } from "react-router-dom"

export function InReq() {
    const [followers, setFollowers] = useState([])

    const userId = useSelector((state) => state.auth._id)
    const navigate = useNavigate()

    useEffect(() => {
        const res = async () => {
            const user = await getRequest(`${baseUrl}/users/find/${userId}`)
            setFollowers(user.followersId)
            console.log(user.followersId);
        }
        res()
    }, [followers])

    // принять / отклонить заявку
    const actionWithRequest = async (action, id) => {
        const add = await getRequest(`${baseUrl}/users/${action}/${id}/${userId}`)
        setFollowers((prev) => prev = prev.filter((user) => user != id))
        return
    }

    return (
        <>
            {
                followers?.map((user) => (
                    <div>
                        <div>
                            <img src="" alt="аватар" />
                            <h6 onClick={() => navigate(`../../../user/${user}`)}><Nickname id={user} /></h6>
                        </div>
                        <button onClick={() => actionWithRequest("addFriend", user)}>принять</button>
                        <button onClick={() => actionWithRequest("unsubscribe", user)}>отклонить</button>
                    </div>
                )
                )
            }
            {
                followers.length == 0 && <div>В данном списке еще нет пользователей.</div>
            }
        </>
    )

}