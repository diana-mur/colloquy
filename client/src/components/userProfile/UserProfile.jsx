import { useEffect, useState } from "react";
import { baseUrl, getRequest, postRequest } from "../../utils/services";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { Nickname } from "../nick/Nickname";

export function UserProfile() {
    const [user, setUser] = useState(null)
    const [friend, setFriend] = useState(false)
    const [follower, setFollower] = useState(false)
    const [following, setFollowing] = useState(false)
    const [createdAt, setCreatedAt] = useState('')

    const location = useLocation()
    const path = location.pathname.split("/")[2]
    const navigate = useNavigate()

    const userId = useSelector((state) => state.auth._id)

    if (userId == path) {
        navigate("../myProfile")
    }

    useEffect(() => {
        const user = async () => {
            const user = await getRequest(`${baseUrl}/users/find/${path}`)
            setUser(user)
            setCreatedAt(() => date(user.createdAt))
        }
        user()
    }, [path])

    useEffect(() => {
        const res = async () => {
            const currentUser = await getRequest(`${baseUrl}/users/find/${userId}`)
            console.log(currentUser);

            if (currentUser.friendsId.includes(path)) return setFriend(true);

            // подписчик
            if (currentUser.followersId.includes(path)) return setFollower(true);

            // на кого подписан пользователь
            if (currentUser.followingId.includes(path)) return setFollowing(true);
        }

        res()
    }, [userId])

    const chatLink = async () => {
        const findChat = await getRequest(`${baseUrl}/chats/find/${userId}/${path}`)

        if (findChat.error) {
            return console.log("Ошибка получения чата: ", findChat);
        }

        if (!findChat?._id) {
            const createChat = await postRequest(`${baseUrl}/chats/createChat`, {
                firstId: userId,
                secondId: path
            })
            navigate(`../messages/${createChat._id}`)
            return
        }
        navigate(`../messages/${findChat._id}`)
        return
    }

    // добавить в друзья (принятие заявки)
    const addAsFriend = async () => {
        const response = await getRequest(`${baseUrl}/users/addFriend/${path}/${userId}`)
        window.location.reload()
        return
    }

    // отменить заявку
    const backApplic = async () => {
        const delApplic = await getRequest(`${baseUrl}/users/unsubscribe/${userId}/${path}`)
        window.location.reload()
        return
    }

    // удалить из друзей
    const deleteFriend = async () => {
        const response = await getRequest(`${baseUrl}/users/deleteFriend/${userId}/${path}`)
        window.location.reload()
        return
    }

    // отправить заявку
    const sendApplic = async () => {
        const response = await getRequest(`${baseUrl}/users/subscribe/${userId}/${path}`)
        window.location.reload()
        return
    }

    const date = (date) => {
        const firstUpdate = date.split("T")[0]
        const dd = firstUpdate.split("-")[2]
        const mm = firstUpdate.split("-")[1]
        const gg = firstUpdate.split("-")[0]
        const res = `${dd}.${mm}.${gg}`
        return res
    }

    return (
        <>
            <h2><Nickname id={path} /></h2>
            <img src="" alt="аватар" />
            <p>в colloquy с {createdAt}</p>
            {
                friend ?
                    <button onClick={() => chatLink()}>Написать</button>
                    :
                    follower ?
                        <button onClick={() => addAsFriend()}>Принять заявку</button>
                        :
                        following ?
                            <button onClick={() => backApplic()}>Отменить заявку</button>
                            :
                            <button onClick={() => sendApplic()}>Добавить в друзья</button>
            }
            {
                friend ?
                    <button onClick={() => deleteFriend()}>Удалить из друзей</button>
                    :
                    follower ?
                        <button onClick={() => backApplic()}>Отклонить заявку</button>
                        :
                        <></>
            }
        </>
    )

}