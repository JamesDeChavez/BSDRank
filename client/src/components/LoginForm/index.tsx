import { useLazyQuery } from '@apollo/client'
import { useContext, useEffect, useState } from 'react'
import { UserLoggedInContext } from '../../App'
import { LOGIN_USER } from '../../graphql/query'
import './styles.css'

const LoginForm = () => {
    const [login, { error }] = useLazyQuery(LOGIN_USER)
    const {setUserLoggedIn, setUserId} = useContext(UserLoggedInContext);
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState<string | undefined>()
    
    useEffect(() => {
        console.log(error)
        if (error) setErrorMessage(error.message)
    }, [error])

    useEffect(() => {
        setErrorMessage(undefined)
    }, [username, password])

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!username || !password) return

        const loginData = { username, password }
        try {
            const user = await login({ variables: loginData })
            if (user.data && user.data.login) {
                const token = user.data.login.token
                localStorage.setItem('bsdToken', `Bearer ${token}`)
                setUserId(user.data.login._id)
                setUserLoggedIn(true)
            }
        } catch (error) {
            console.log(error)
        }
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
                <p className={`${className}_error`}>{errorMessage}</p> 
            </form>
        </div>
    )
}

export default LoginForm