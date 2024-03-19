import { Link } from "react-router-dom";

export function Friends() {
    return (
        <nav>
            <Link to={'../../users/myFriends'}>друзья</Link>
            <Link to={'../../users/incomingReq'}>входящие заявки</Link>
            <Link to={'../../users/submittedReq'}>отправленные заявки</Link>
            <Link to={'../../users'}>все пользователи</Link>
        </nav>
    )
}