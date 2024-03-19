import { useFetchNickname } from "../../hooks/useFetchNickname.js"

export const Nickname = ({ id }) => {
    const nickname = useFetchNickname(id)
    console.log(nickname);

    return <>{nickname?.nickname}</>
}