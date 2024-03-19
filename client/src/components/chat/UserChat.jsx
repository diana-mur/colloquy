import { useFetchRecipientUser } from "../../hooks/useFetchRecipient.js"

export const UserChat = ({ chat, user }) => {
    const recipientUser = useFetchRecipientUser(chat, user)

    return <>{recipientUser?.nickname}</>
}