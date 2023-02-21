import { useContext } from 'react'
import { UserLiftActiveContext } from '../../branches/UserLift'
import './styles.css'

const UserLiftItem = () => {
    const setEditActive = useContext(UserLiftActiveContext)

    const handleLiftClick = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
        e.preventDefault()
        setEditActive(prevState => !prevState)
    }

    const className = 'UserLiftItem'
    return (
        <div className={className}>
            <span>Username</span>
            <span>1/22/23</span>
            <span>Bench: 220 ={'>'} 225</span>
            <span className={`${className}_verify`} onClick={handleLiftClick}>Unverified</span>
        </div>
    )
}

export default UserLiftItem