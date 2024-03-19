import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { baseUrl, getRequest } from "../utils/services"
import { Nickname } from "../components/nick/Nickname"
import { logOut } from "../redux/authSlice"
import avatar from "../assets/avatar.jpg"

export function MyProfile() {
    const [createdAt, setCreatedAt] = useState('')
    const userId = useSelector((state) => state.auth._id)

    const dispatch = useDispatch()

    useEffect(() => {
        const res = async () => {
            const user = await getRequest(`${baseUrl}/users/find/${userId}`)
            console.log(user);

            setCreatedAt(date(user.createdAt))
        }
        res()
    }, [userId])

    const date = (date) => {
        const firstUpdate = date.split("T")[0]
        const dd = firstUpdate.split("-")[2]
        const mm = firstUpdate.split("-")[1]
        const gg = firstUpdate.split("-")[0]
        const res = `${dd}.${mm}.${gg}`
        return res
    }

    return (
        <div>
            <h2><Nickname id={userId} /></h2>
            <div>
                <img src={avatar} alt="аватар" />
            </div>
            <div>
                <p>в colloquy с {createdAt}</p>
            </div>
            <button>Изменить</button>
            <button onClick={() => dispatch(logOut())}>Выйти</button>
        </div>
    )
}