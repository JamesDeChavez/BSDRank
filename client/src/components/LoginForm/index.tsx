import { useContext, useState } from 'react'
import { UserLoggedInContext } from '../../App'
import './styles.css'

const LoginForm = () => {
    const [_, setUserLoggedIn] = useContext(UserLoggedInContext);
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const loginData = { username, password }
        setUserLoggedIn(prevState => !prevState)
        console.log(loginData)
    }

    const className = 'LoginForm'
    return (
        <div className={className}>
            <form className={`${className}_form`} onSubmit={handleSubmit}>
                <h1 className={`${className}_header`}>Login</h1>
                <div className={`${className}_inputContainer`}>
                    <label htmlFor="username">Username</label>
                    <input id='username' className={`${className}_input`} type="text" autoComplete='off' value={username} onChange={e => setUsername(e.target.value)} required />
                </div>
                <div className={`${className}_inputContainer`}>
                    <label htmlFor="password">Password</label>
                    <input id='password' className={`${className}_input`} type="password" value={password} onChange={e => setPassword(e.target.value)} required/>
                </div>
                <input type="submit" value="Submit" className={`${className}_submitButton`} />
            </form>
        </div>
    )
}

export default LoginForm