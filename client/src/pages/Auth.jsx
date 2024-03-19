import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { authThunk } from "../redux/authSlice"
import { Link } from "react-router-dom"

export const Auth = () => {
  const [nickname, setNickname] = useState('')
  const [password, setPassword] = useState('')

  const authState = useSelector((state) => state.auth)
  const dispatch = useDispatch()

    return (
      <>
        <h1>col</h1>
        <h1>loq</h1>
        <h1>uy</h1>
        <div>
          <div className="formAuth">
            <h1>Вход</h1>
            <input type="text" className="bottomLine" value={nickname} onChange={e => setNickname(e.target.value)} placeholder="никнейм" />
            <input type="text" className="bottomLine" value={password} onChange={e => setPassword(e.target.value)} placeholder="пароль" />
            <div className="formAuthButtons">
              <button onClick={() => {
                dispatch(authThunk({
                  nickname,
                  password
                }))
              }}>Войти</button>
              <Link to={'../reg'}>нет аккаунта?</Link>
            </div>
          </div>
          {
            authState.error ? <p>{authState.error}</p> : <></>
          }
        </div>
      </>
    )
  }