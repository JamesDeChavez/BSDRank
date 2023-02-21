import { useContext } from 'react'
import { UserLoggedInContext } from '../../App'
import './styles.css'

const LoginForm = () => {

    const [_, setUserLoggedIn] = useContext(UserLoggedInContext);
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setUserLoggedIn(prevState => !prevState)
    }

    const className = 'LoginForm'
    return (
        <div className={className}>
            <form className={`${className}_form`} onSubmit={handleSubmit}>
                <h1 className={`${className}_header`}>Login</h1>
                <div className={`${className}_inputContainer`}>
                    <label htmlFor="username">Username</label>
                    <input id='username' type="text" />
                </div>
                <div className={`${className}_inputContainer`}>
                    <label htmlFor="password">Password</label>
                    <input id='password' type="text" />
                </div>
                <input type="submit" value="Submit" />
            </form>
        </div>
    )
}

export default LoginForm