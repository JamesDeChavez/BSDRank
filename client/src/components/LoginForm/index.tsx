import { useContext, useEffect, useState, useLayoutEffect, useRef } from 'react'
import { useLazyQuery } from '@apollo/client'
import { UserLoggedInContext } from '../../App'
import { LOGIN_USER } from '../../graphql/query'
import { gsap } from 'gsap'
import './styles.css'

const LoginForm = () => {
    const [login, { error, loading }] = useLazyQuery(LOGIN_USER)
    const {setUserLoggedIn, setUserId} = useContext(UserLoggedInContext);
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState<string | undefined>()
    const root = useRef(null)

    useEffect(() => {
        if (error) setErrorMessage(error.message)
    }, [error])

    useEffect(() => {
        setErrorMessage(undefined)
    }, [username, password])

    useLayoutEffect(() => {
        const gsapContext = gsap.context(() => {
            gsap.to(`.${className}_circle1`, { duration: 0.6, opacity: 0, repeat: -1, yoyo: true})
            gsap.to(`.${className}_circle2`, { duration: 0.6, opacity: 0, repeat: -1, yoyo: true, delay: 0.2})
            gsap.to(`.${className}_circle3`, { duration: 0.6, opacity: 0, repeat: -1, yoyo: true, delay: 0.4})
            return () => gsapContext.revert()
        }, root)
    }, [])

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
                <div className={`${className}_loadingContainer`} ref={root} style={{display: loading ? 'flex' : 'none'}} > 
                    <p className={`${className}_loading`}>Loading</p>
                    <svg viewBox="0 0 100 100" className={`${className}_loadingSvg`} >
                        <circle fill="#fff" stroke="none" cx="25" cy="50" r="6" className={`${className}_circle1`} />
                        <circle fill="#fff" stroke="none" cx="50" cy="50" r="6" className={`${className}_circle2`} />
                        <circle fill="#fff" stroke="none" cx="75" cy="50" r="6" className={`${className}_circle3`} />
                    </svg>
                </div> 
            </form>
        </div>
    )
}

export default LoginForm