import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { regThunk } from "../redux/regSlice"
import { Link, useNavigate } from "react-router-dom"
import logo1 from "../assets/logo1.png"

export function Reg() {
    const [nickname, setNickname] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [checkbox, setCheckbox] = useState(false)

    const regState = useSelector((state) => state.reg)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        if (regState.message) {
            navigate('/login')
        }
    }, [regState])

    const handleCheckboxChange = () => {
        setCheckbox(prevState => !prevState); // Toggle the checkbox value
    };

    return (
        <div className="flex">
            <img src={logo1} className="height" alt="логотип" />
            <div className="formAuth height width flex">
                <div className="form flex">
                    <h1>Регистрация</h1>
                    <input type="text" className="bottomLine" value={nickname} onChange={e => setNickname(e.target.value)} placeholder="никнейм" />
                    <input type="text" className="bottomLine" value={email} onChange={e => setEmail(e.target.value)} placeholder="email" />
                    <input type="text" className="bottomLine" value={password} onChange={e => setPassword(e.target.value)} placeholder="пароль" />
                    <div className="formCheck flex">
                        <input type="checkbox" id="checkbox" className="" checked={checkbox} onChange={handleCheckboxChange} />
                        <label htmlFor="checkbox">
                            я подтверждаю, что мне есть полных 17 лет и согласен <br />с <a href="" style={{
                                color: '#B3B3B3'
                            }}>политикой конфиденциальности</a>
                        </label>
                    </div>
                    <div className="formAuthButtons flex">

                        {
                            checkbox ?
                                <button onClick={() => {
                                    dispatch(regThunk({
                                        nickname,
                                        email,
                                        password
                                    }))
                                }}>Зарегистрироваться</button>
                                :
                                <button disabled>Зарегистрироваться</button>
                        }

                        <h4><Link to={'../login'}>есть аккаунт?</Link></h4>
                    </div>
                </div>
                {
                    regState.error ? <p>{regState.error}</p> : <></>
                }
            </div>
        </div>
    )

}