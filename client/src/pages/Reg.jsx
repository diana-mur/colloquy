import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { regThunk } from "../redux/regSlice"
import { Link, useNavigate } from "react-router-dom"

export function Reg() {
    const [nickname, setNickname] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [checkbox, setCheckbox] = useState(false)

    const regState = useSelector((state) => state.reg)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        if (regState) {
            navigate('/login')
        }
    }, [regState])

    const handleCheckboxChange = () => {
        setCheckbox(prevState => !prevState); // Toggle the checkbox value
    };

    return (
        <>
            <h1>col</h1>
            <h1>loq</h1>
            <h1>uy</h1>
            <div>
                <div className="formAuth">
                    <h1>Регистрация</h1>
                    <input type="text" className="bottomLine" value={nickname} onChange={e => setNickname(e.target.value)} placeholder="никнейм" />
                    <input type="text" className="bottomLine" value={email} onChange={e => setEmail(e.target.value)} placeholder="email" />
                    <input type="text" className="bottomLine" value={password} onChange={e => setPassword(e.target.value)} placeholder="пароль" />
                    <input type="checkbox" id="checkbox" className="bottomLine" checked={checkbox} onChange={handleCheckboxChange} />
                    <label htmlFor="checkbox">я подтверждаю, что мне есть полных 17 лет и согласен с <a href="">политикой конфиденциальности</a></label>
                    <div className="formAuthButtons">

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

                        <Link to={'../login'}>есть аккаунт?</Link>
                    </div>
                </div>
                {
                    regState.error ? <p>{regState.error}</p> : <></>
                }
            </div>
        </>
    )

}