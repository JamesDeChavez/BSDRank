import UserLiftItem from '../UserLiftItem/UserLiftItem'
import './styles.css'

const UserLifts = () => {
    const className = 'UserLifts'
    return (
        <div className={className}>
            <h1 className={`${className}_header`}>Your Recent Lifts</h1>
            <div className={`${className}_liftsContainer`}>
                {Array(10).fill('').map(n => {
                    return <UserLiftItem/>
                })}
            </div>
        </div>
    )
}

export default UserLifts