import { useSelector } from "react-redux"
import { baseUrl, getRequest } from "../../utils/services"
import { useEffect, useState } from "react"
import { Nickname } from "../nick/Nickname.jsx"
import { useNavigate } from "react-router-dom"

export function OutReq() {
    const [following, setFollowing] = useState([])
    const navigate = useNavigate()

    const userId = useSelector((state) => state.auth._id)

    useEffect(() => {
        const res = async () => {
            const user = await getRequest(`${baseUrl}/users/find/${userId}`)
            setFollowing(user.followingId)
            console.log(following);
        }
        res()
    }, [userId])

    // отменить заявку
    const unsubscribe = async (id) => {
        const unsubscribe = await getRequest(`${baseUrl}/users/unsubscribe/${userId}/${id}`)
        setFollowing((prev) => prev = prev.filter((user) => user != id))
        return
    }

    return (
        <>
            {
                following.map((user) => (
                    <div key={user}>
                        <div>
                            <img src="" alt="аватар" />
                            <h6 onClick={() => navigate(`../../../user/${user}`)}><Nickname id={user} /></h6>
                        </div>
                        <button onClick={() => unsubscribe(user)}>отменить</button>
                    </div>
                )
                )
            }
            {
                following.length == 0 && <div>В данном списке еще нет пользователей.</div>
            }
        </>
    )

}