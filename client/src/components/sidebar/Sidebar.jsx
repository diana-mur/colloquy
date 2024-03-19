import { Link } from "react-router-dom";

export function SideBar() {
    return (
        <>
            <Link to={'../../../../myProfile'}>мой профиль</Link>
            <Link to={'../../../../messages'}>мессенджер</Link>
            <Link to={'../../../../users/myFriends'}>друзья</Link>
        </>
    )
}