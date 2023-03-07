import { useContext } from 'react'
import { NonAuthRenderContext } from '../../branches/NonAuth'
import './styles.css'

const CallToAction = () => {
    const [RENDERS, setRender] = useContext(NonAuthRenderContext)

    const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        setRender(RENDERS[2])
    }

    const className = 'CallToAction'
    return (
        <div className={className}>
            <p className={`${className}_text`}>Signup now to start tracking your progress!</p>
            <button className={`${className}_button`} onClick={handleClick}>Create an Account</button>
        </div>
    )
}

export default CallToAction