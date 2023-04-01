import { useContext, useState, useRef, useEffect, useLayoutEffect } from 'react'
import { useMutation } from '@apollo/client'
import { UserLoggedInContext } from '../../App'
import { CREATE_USER } from '../../graphql/mutations'
import classNames from 'classnames'
import { gsap } from 'gsap'
import './styles.css'

const RegisterForm = () => {
    const [createUser, { error, loading }] = useMutation(CREATE_USER)
    const { setUserLoggedIn, setUserId } = useContext(UserLoggedInContext)
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [repeatPW, setRepeatPW] = useState('')
    const [sex, setSex] = useState('')
    const [weight, setWeight] = useState(145)
    const [benchWeight, setBenchWeight] = useState(155)
    const [benchReps, setBenchReps] = useState(5)
    const [squatWeight, setSquatWeight] = useState(225)
    const [squatReps, setSquatReps] = useState(5)
    const [deadliftWeight, setDeadliftWeight] = useState(265)
    const [deadliftReps, setDeadliftReps] = useState(5)
    const [errorMessage, setErrorMessage] = useState<string | undefined>()
    const weightRef: any = useRef()
    const intervalRef: any = useRef()
    const changeRef: any = useRef()
    const countRef: any = useRef()
    const root = useRef(null)

    useLayoutEffect(() => {
        const gsapContext = gsap.context(() => {
            gsap.to(`.${className}_circle1`, { duration: 0.6, opacity: 0, repeat: -1, yoyo: true})
            gsap.to(`.${className}_circle2`, { duration: 0.6, opacity: 0, repeat: -1, yoyo: true, delay: 0.2})
            gsap.to(`.${className}_circle3`, { duration: 0.6, opacity: 0, repeat: -1, yoyo: true, delay: 0.4})
            return () => gsapContext.revert()
        }, root)
    }, [])

    const handleWeightInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name
        switch (name) {
            case 'weight':
                setWeight(prevState => e.target.validity.valid ? Number(e.target.value) : prevState); break
            case 'benchWeight':
                setBenchWeight(prevState => e.target.validity.valid ? Number(e.target.value) : prevState); break
            case 'squatWeight':
                setSquatWeight(prevState => e.target.validity.valid ? Number(e.target.value) : prevState); break
            case 'deadliftWeight':
                setDeadliftWeight(prevState => e.target.validity.valid ? Number(e.target.value) : prevState); break
            default: break
        }
    }

    const handleNumberInputButtonClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, name: string, direction: string) => {
        e.preventDefault()
        switch (name) {
            case 'weight':
                if (direction === 'decrease' && weight! > 1) setWeight(prevState => prevState - 1)
                if (direction === 'increase' && weight < 999) setWeight(prevState => prevState + 1)
                break
            case 'benchWeight':
                if (direction === 'decrease' && benchWeight > 1) setBenchWeight(prevState => prevState - 1)
                if (direction === 'increase' && benchWeight < 999) setBenchWeight(prevState => prevState + 1)
                break
            case 'benchReps':
                if (direction === 'decrease' && benchReps > 1) setBenchReps(prevState => prevState - 1)
                if (direction === 'increase' && benchReps < 12) setBenchReps(prevState => prevState + 1)
                break
            case 'squatWeight':
                if (direction === 'decrease' && squatWeight > 1) setSquatWeight(prevState => prevState - 1)
                if (direction === 'increase' && squatWeight < 999) setSquatWeight(prevState => prevState + 1)
                break
            case 'squatReps':
                if (direction === 'decrease' && squatReps > 1) setSquatReps(prevState => prevState - 1)
                if (direction === 'increase' && squatReps < 12) setSquatReps(prevState => prevState + 1)
                break
            case 'deadliftWeight':
                if (direction === 'decrease' && deadliftWeight > 1) setDeadliftWeight(prevState => prevState - 1)
                if (direction === 'increase' && deadliftWeight < 999) setDeadliftWeight(prevState => prevState + 1)
                break
            case 'deadliftReps':
                if (direction === 'decrease' && deadliftReps > 1) setDeadliftReps(prevState => prevState - 1)
                if (direction === 'increase' && deadliftReps < 12) setDeadliftReps(prevState => prevState + 1)
                break
            default: break
        }
    }

    const handleWeightMouseDown = (e: React.MouseEvent<HTMLButtonElement, MouseEvent> | React.TouchEvent<HTMLButtonElement>, name: string, direction: string) => {
        switch (name) {
            case 'weight':
                weightRef.current = weight
                break
            case 'benchWeight':
                weightRef.current = benchWeight
                break
            case 'squatWeight':
                weightRef.current = squatWeight
                break
            case 'deadliftWeight':
                weightRef.current = deadliftWeight
                break
            default: break
        }

        countRef.current = 0
        changeRef.current = 1

        intervalRef.current = setInterval(() => {
            if(countRef.current === 10) changeRef.current = 5
            if(countRef.current === 30) changeRef.current = 10            
            switch (name) {
                case 'weight':
                    if(direction === 'decrease' && weightRef.current > 10) {
                        setWeight(weightRef.current - changeRef.current)
                        weightRef.current = weightRef.current - changeRef.current
                    }
                    if(direction === 'increase' && weightRef.current < 990) {
                        setWeight(weightRef.current + changeRef.current)
                        weightRef.current = weightRef.current + changeRef.current
                    }
                    break
                case 'benchWeight':
                    if(direction === 'decrease' && weightRef.current > 10) {
                        setBenchWeight(weightRef.current - changeRef.current)
                        weightRef.current = weightRef.current - changeRef.current
                    }
                    if(direction === 'increase' && weightRef.current < 990) {
                        setBenchWeight(weightRef.current + changeRef.current)
                        weightRef.current = weightRef.current + changeRef.current
                    }
                    break
                case 'squatWeight':
                    if(direction === 'decrease' && weightRef.current > 10) {
                        setSquatWeight(weightRef.current - changeRef.current)
                        weightRef.current = weightRef.current - changeRef.current
                    }
                    if(direction === 'increase' && weightRef.current < 990) {
                        setSquatWeight(weightRef.current + changeRef.current)
                        weightRef.current = weightRef.current + changeRef.current
                    }
                    break
                case 'deadliftWeight':
                    if(direction === 'decrease' && weightRef.current > 10) {
                        setDeadliftWeight(weightRef.current - changeRef.current)
                        weightRef.current = weightRef.current - changeRef.current
                    }
                    if(direction === 'increase' && weightRef.current < 990) {
                        setDeadliftWeight(weightRef.current + changeRef.current)
                        weightRef.current = weightRef.current + changeRef.current
                    }
                    break
                default: break
            }
            countRef.current++
            return () => clearInterval(intervalRef.current)
        }, 100)

    }

    const handleWeightMouseUp = (e: React.MouseEvent<HTMLButtonElement, MouseEvent> | React.TouchEvent<HTMLButtonElement>) => {
        clearInterval(intervalRef.current)
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!username || !email || !password || !repeatPW) return
        if (username.length < 7) {
            setErrorMessage('Username must be atleast 7 characters long')
            return
        }
        if (password.length < 7) {
            setErrorMessage('Password must be atleast 7 characters long')
            return
        }
        if (!sex) {
            setErrorMessage('No sex selected')
            return
        }
        if (password !== repeatPW) {
            setErrorMessage('Passwords do not match') 
            return
        }

        const registerData = {
            username, email, password, sex, weight, bestLifts: {
                bench: { weight: benchWeight, reps: benchReps},
                squat: { weight: squatWeight, reps: squatReps},
                deadlift: { weight: deadliftWeight, reps: deadliftReps},
            }
        }
        try {
            const newUser = await createUser({variables: registerData})
            if (newUser.data.createUser) {
                const token = newUser.data.createUser.token
                localStorage.setItem('bsdToken', `Bearer ${token}`)
                setUserId(newUser.data.createUser._id)
                setUserLoggedIn(true)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (error) setErrorMessage(error.message)
    }, [error])

    useEffect(() => {
        setErrorMessage(undefined)
    }, [username, email, password, repeatPW, sex, weight, benchWeight, benchReps, squatWeight, squatReps, deadliftWeight, deadliftReps])

    const className = 'RegisterForm'
    return (
        <div className={className}>
            <form className={`${className}_form`} onSubmit={handleSubmit}>
                <h1 className={`${className}_header`}>Register</h1>
                <div className={`${className}_inputContainer`}>
                    <label className={`${className}_label`} htmlFor="username">Username</label>
                    <input className={`${className}_input`} type="text" id='username' autoComplete='off' value={username} onChange={e => setUsername(e.target.value)} required />
                </div>
                <div className={`${className}_inputContainer`}>
                    <label className={`${className}_label`} htmlFor="email">Email</label>
                    <input className={`${className}_input`} type="email" id='email' autoComplete='off' value={email} onChange={e => setEmail(e.target.value)} required />
                </div>
                <div className={`${className}_inputContainer`}>
                    <label className={`${className}_label`} htmlFor="password">Password</label>
                    <input className={`${className}_input`} type="password" id='password' value={password} onChange={e => setPassword(e.target.value)} />
                </div>
                <div className={`${className}_inputContainer`}>
                    <label className={`${className}_label`} htmlFor="repeatPW">Repeat Password</label>
                    <input className={`${className}_input`} type="password" id='repeatPW' value={repeatPW} required onChange={e => setRepeatPW(e.target.value)} />
                </div>

                <div className={`${className}_formSectionContainer`}>
                    <label htmlFor="weight" className={`${className}_label`}>Body Weight</label>
                    <div className={`${className}_selectBorder`}>
                        <div className={`${className}_buttonSelectContainer`}>
                            <button className={`${className}_numberButton`} onClick={e => handleNumberInputButtonClick(e, 'weight', 'decrease')} onMouseDown={e => handleWeightMouseDown(e, 'weight', 'decrease')} onMouseUp={handleWeightMouseUp} onTouchStart={e => handleWeightMouseDown(e, 'weight', 'decrease')} onTouchEnd={handleWeightMouseUp}>{'<'}</button>
                            <div className={`${className}_inputTextContainer`}>
                                <input type="text" pattern="[0-9]*" name="weight" id="weight" value={weight} className={`${className}_numberInput`} onChange={handleWeightInputChange}/>
                                <span className={`${className}_text`}>{'lbs'}</span>
                            </div>
                            <button className={`${className}_numberButton`} onClick={e => handleNumberInputButtonClick(e, 'weight', 'increase')} onMouseDown={e => handleWeightMouseDown(e, 'weight', 'increase')} onMouseUp={handleWeightMouseUp} onTouchStart={e => handleWeightMouseDown(e, 'weight', 'increase')} onTouchEnd={handleWeightMouseUp}>{'>'}</button>
                        </div>
                    </div>
                        
                </div>

                <div className={`${className}_formSectionContainer`}>
                    <label htmlFor="benchWeight" className={`${className}_label`}>Bench PR</label>
                    <div className={`${className}_selectBorder`}>
                        <div className={`${className}_buttonSelectContainer`}>
                            <button className={`${className}_numberButton`} onClick={e => handleNumberInputButtonClick(e, 'benchWeight', 'decrease')} onMouseDown={e => handleWeightMouseDown(e, 'benchWeight', 'decrease')} onMouseUp={handleWeightMouseUp} onTouchStart={e => handleWeightMouseDown(e, 'benchWeight', 'decrease')} onTouchEnd={handleWeightMouseUp}>{'<'}</button>
                                <div className={`${className}_inputTextContainer`}>
                                    <input type="text" pattern="[0-9]*" name="benchWeight" id="benchWeight" value={benchWeight}  className={`${className}_numberInput`} onChange={handleWeightInputChange} />
                                    <span className={`${className}_text`}>{'lbs'}</span>
                                </div>
                            <button className={`${className}_numberButton`} onClick={e => handleNumberInputButtonClick(e, 'benchWeight', 'increase')} onMouseDown={e => handleWeightMouseDown(e, 'benchWeight', 'increase')} onMouseUp={handleWeightMouseUp} onTouchStart={e => handleWeightMouseDown(e, 'benchWeight', 'increase')} onTouchEnd={handleWeightMouseUp}>{'>'}</button>
                        </div>
                        
                        <div className={`${className}_buttonSelectContainer`}>
                            <button className={`${className}_numberButton`} onClick={e => handleNumberInputButtonClick(e, 'benchReps', 'decrease')} >{'<'}</button>
                                <div className={`${className}_inputTextContainer`}>
                                    <input type="text" pattern="[0-9]*" name="benchReps" id="benchReps" value={benchReps} className={`${className}_repsInput`} onChange={handleWeightInputChange} readOnly={true}/>
                                    <span className={`${className}_text`}>{'reps'}</span>
                                </div>
                            <button className={`${className}_numberButton`} onClick={e => handleNumberInputButtonClick(e, 'benchReps', 'increase')} >{'>'}</button>
                        </div>
                    </div>
                </div>

                <div className={`${className}_formSectionContainer`}>
                    <label htmlFor="squatWeight" className={`${className}_label`}>Squat PR</label>
                    <div className={`${className}_selectBorder`}>
                        <div className={`${className}_buttonSelectContainer`}>
                            <button className={`${className}_numberButton`} onClick={e => handleNumberInputButtonClick(e, 'squatWeight', 'decrease')} onMouseDown={e => handleWeightMouseDown(e, 'squatWeight', 'decrease')} onMouseUp={handleWeightMouseUp} onTouchStart={e => handleWeightMouseDown(e, 'squatWeight', 'decrease')} onTouchEnd={handleWeightMouseUp}>{'<'}</button>
                                <div className={`${className}_inputTextContainer`}>
                                    <input type="text" pattern="[0-9]*" name="squatWeight" id="squatWeight" value={squatWeight}  className={`${className}_numberInput`} onChange={handleWeightInputChange} />
                                    <span className={`${className}_text`}>{'lbs'}</span>
                                </div>
                            <button className={`${className}_numberButton`} onClick={e => handleNumberInputButtonClick(e, 'squatWeight', 'increase')} onMouseDown={e => handleWeightMouseDown(e, 'squatWeight', 'increase')} onMouseUp={handleWeightMouseUp} onTouchStart={e => handleWeightMouseDown(e, 'squatWeight', 'increase')} onTouchEnd={handleWeightMouseUp}>{'>'}</button>
                        </div>
                        
                        <div className={`${className}_buttonSelectContainer`}>
                            <button className={`${className}_numberButton`} onClick={e => handleNumberInputButtonClick(e, 'squatReps', 'decrease')}>{'<'}</button>
                                <div className={`${className}_inputTextContainer`}>
                                    <input type="text" pattern="[0-9]*" name="squatReps" id="squatReps" value={squatReps} className={`${className}_repsInput`} onChange={handleWeightInputChange} />
                                    <span className={`${className}_text`}>{'reps'}</span>
                                </div>
                            <button className={`${className}_numberButton`} onClick={e => handleNumberInputButtonClick(e, 'squatReps', 'increase')}>{'>'}</button>
                        </div>
                    </div>
                </div>

                <div className={`${className}_formSectionContainer`}>
                    <label htmlFor="deadliftWeight" className={`${className}_label`}>Deadlift PR</label>
                    <div className={`${className}_selectBorder`}>
                        <div className={`${className}_buttonSelectContainer`}>
                            <button className={`${className}_numberButton`} onClick={e => handleNumberInputButtonClick(e, 'deadliftWeight', 'decrease')} onMouseDown={e => handleWeightMouseDown(e, 'deadliftWeight', 'decrease')} onMouseUp={handleWeightMouseUp} onTouchStart={e => handleWeightMouseDown(e, 'deadliftWeight', 'decrease')} onTouchEnd={handleWeightMouseUp}>{'<'}</button>
                                <div className={`${className}_inputTextContainer`}>
                                    <input type="text" pattern="[0-9]*" name="deadliftWeight" id="deadliftWeight" value={deadliftWeight}  className={`${className}_numberInput`} onChange={handleWeightInputChange}/>
                                    <span className={`${className}_text`}>{'lbs'}</span>
                                </div>
                            <button className={`${className}_numberButton`} onClick={e => handleNumberInputButtonClick(e, 'deadliftWeight', 'increase')} onMouseDown={e => handleWeightMouseDown(e, 'deadliftWeight', 'increase')} onMouseUp={handleWeightMouseUp} onTouchStart={e => handleWeightMouseDown(e, 'deadliftWeight', 'increase')} onTouchEnd={handleWeightMouseUp}>{'>'}</button>
                        </div>
                        
                        <div className={`${className}_buttonSelectContainer`}>
                            <button className={`${className}_numberButton`} onClick={e => handleNumberInputButtonClick(e, 'deadliftReps', 'decrease')}>{'<'}</button>
                                <div className={`${className}_inputTextContainer`}>
                                    <input type="text" pattern="[0-9]*" name="deadliftReps" id="deadliftReps" value={deadliftReps} className={`${className}_repsInput`} onChange={handleWeightInputChange} />
                                    <span className={`${className}_text`}>{'reps'}</span>
                                </div>
                            <button className={`${className}_numberButton`} onClick={e => handleNumberInputButtonClick(e, 'deadliftReps', 'increase')}>{'>'}</button>
                        </div>
                    </div>
                </div>

                <div className={`${className}_formSectionContainer`}>
                    <label htmlFor="sex" className={`${className}_label`}>Sex</label>
                    <div className={`${className}_sexButtonsContainer`}>
                        <button 
                            className={classNames(
                                `${className}_sexButton`,
                                {[`${className}_sexSelected`]: sex === 'MALE' } 
                            )} 
                            onClick={(e) => {
                                e.preventDefault(); setSex('MALE')
                        }}>Male</button>
                        <button 
                            className={classNames(
                                `${className}_sexButton`,
                                {[`${className}_sexSelected`]: sex === 'FEMALE' } 
                            )} 
                            onClick={(e) => {
                                e.preventDefault(); setSex('FEMALE')
                        }}>Female</button>
                    </div>
                </div>
                <input className={`${className}_submitButton`} type="submit" value='Create Account' />
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

export default RegisterForm