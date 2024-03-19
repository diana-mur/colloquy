import { useEffect, useState } from "react"
import { baseUrl, getRequest } from "../utils/services"

export const useFetchNickname = (userId) => {
    const [user, setUser] = useState(null)

    useEffect(() => {
        const getUser = async () => {
            if (!userId) return null

            const response = await getRequest(`${baseUrl}/users/find/${userId}`)

            setUser(response);
        };

        getUser()
    }, [userId])

    return user
}