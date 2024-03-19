import { useSelector } from "react-redux"
import { baseUrl, getRequest } from "../../utils/services"
import { useEffect, useState } from "react"
import { Nickname } from "../nick/Nickname.jsx"
import { useNavigate } from "react-router-dom"
import avatar from "../../assets/avatar.jpg"

export function AllUsers() {
    const [users, setUsers] = useState([])
    const navigate = useNavigate()

    const userId = useSelector((state) => state.auth._id)

    useEffect(() => {
        const res = async () => {
            const resAllUsers = await getRequest(`${baseUrl}/users/getUsers`)
            const currentUser = await getRequest(`${baseUrl}/users/find/${userId}`)

            const filteredUsers = resAllUsers.filter(user => {
                // Фильтрация владельца аккаунта
                if (user._id === userId) return false;

                // Фильтрация друзей
                if (currentUser.friendsId.includes(user._id)) return false;

                // Фильтрация подписчиков
                if (currentUser.followersId.includes(user._id)) return false;

                // Фильтрация тех, на кого подписан пользователь
                if (currentUser.followingId.includes(user._id)) return false;

                // Если не подходит ни одно из условий, пользователь проходит фильтрацию
                return true;
            });

            setUsers(filteredUsers)

        }
        res()
    }, [userId])

    // подать заявку
    const subscribe = async (id) => {
        const addFriend = await getRequest(`${baseUrl}/users/subscribe/${userId}/${id}`)
        return
    }

    const click = (id) => {
        subscribe(id);
        setUsers((prev) => prev = prev.filter((user) => user._id != id))
    }

    return (
        <div>
            {
                users?.map((user) => (
                    <div>
                        <div>
                            <div>
                                <img src={avatar} alt="аватар" />
                            </div>
                            <h6 onClick={() => navigate(`../../../user/${user._id}`)}><Nickname id={user._id} /></h6>
                        </div>
                        <button onClick={() => click(user._id)}>добавить</button>
                    </div>
                )
                )
            }
            {
                users.length == 0 && <div>В данном списке еще нет пользователей.</div>
            }
        </div>
    )

}