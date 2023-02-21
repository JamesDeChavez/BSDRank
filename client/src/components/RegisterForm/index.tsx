import { useContext } from 'react'
import { UserLoggedInContext } from '../../App'
import './styles.css'

const RegisterForm = () => {
    const [_, setUserLoggedIn] = useContext(UserLoggedInContext)

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setUserLoggedIn(prevState => !prevState)
    }

    const className = 'RegisterForm'
    return (
        <div className={className}>
            <form className={`${className}_form`} onSubmit={handleSubmit}>
                <h1 className={`${className}_header`}>Register</h1>
                <div className={`${className}_inputContainer`}>
                    <label htmlFor="username">Username</label>
                    <input type="text" id='username' />
                </div>
                <div className={`${className}_inputContainer`}>
                    <label htmlFor="email">Email</label>
                    <input type="email" id='email' />
                </div>
                <div className={`${className}_inputContainer`}>
                    <label htmlFor="password">Password</label>
                    <input type="password" id='password' />
                </div>
                <div className={`${className}_inputContainer`}>
                    <label htmlFor="repeatPW">Repeat Password</label>
                    <input type="text" id='repeatPW' />
                </div>
                <input type="submit" value='Create Account' />
            </form>
        </div>
    )
}

export default RegisterForm