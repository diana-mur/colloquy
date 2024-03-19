import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { authThunk } from "../redux/authSlice"
import { Link } from "react-router-dom"
import logo1 from "../assets/logo1.png"

export const Auth = () => {
  const [nickname, setNickname] = useState('')
  const [password, setPassword] = useState('')

  const authState = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  return (
    <div className="flex">
      <img src={logo1} className="height" alt="логотип" />
      <div className="formAuth height width flex">
        <div className="form flex">
          <h1>Вход</h1>
          <input type="text" className="bottomLine" value={nickname} onChange={e => setNickname(e.target.value)} placeholder="никнейм" />
          <input type="text" className="bottomLine" value={password} onChange={e => setPassword(e.target.value)} placeholder="пароль" />
          <div className="formAuthButtons flex">
            <button onClick={() => {
              dispatch(authThunk({
                nickname,
                password
              }))
            }}>Войти</button>
            <h4><Link to={'../reg'}>нет аккаунта?</Link></h4>
          </div>
          {
            authState.error ? <p>{authState.error}</p> : <></>
          }
        </div>
      </div>
    </div>
  )
}