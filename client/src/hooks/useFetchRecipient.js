import { useEffect, useState } from "react"
import { baseUrl, getRequest } from "../utils/services"

export const useFetchRecipientUser = (chat, userId) => {
    const [recipientUser, setRecipientUser] = useState(null)
    const [error, setError] = useState(null)

    const recipientId = chat?.members.find((id) => id !== userId)

    useEffect(() => {
        const getUser = async () => {
            if (!recipientId) return null

            const response = await getRequest(`${baseUrl}/users/find/${recipientId}`)

            if (response.error) {
                return setError(error)
            }

            setRecipientUser(response);
        };

        getUser()
    }, [])

    return recipientUser

}