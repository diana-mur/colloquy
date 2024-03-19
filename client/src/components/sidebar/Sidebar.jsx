import { Link, useLocation, useNavigate } from "react-router-dom";
import avatar from "../../assets/avatar.jpg"
import logo from "../../assets/logo2.png"

export function SideBar() {
    const location = useLocation()
    const navigate = useNavigate()

    return (
        <nav className="flex height">
            <div className="topSidebar flex">
                <div onClick={() => navigate('../../../../myProfile')} className="avatarSidebar">
                    <img src={avatar} alt="" />
                </div>
                <div onClick={() => navigate('../../../../myProfile')} className="logoSidebar">
                    <img src={logo} alt="" />
                </div>
            </div>
            <Link to={'../../../../myProfile'} className={
                location == '/myProfile' ? '' : ''
            }>мой профиль</Link>
            <Link to={'../../../../messages'}>мессенджер</Link>
            <Link to={'../../../../users/myFriends'}>друзья</Link>
        </nav>
    )
}