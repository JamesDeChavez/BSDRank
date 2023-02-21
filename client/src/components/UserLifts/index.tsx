import UserLiftBranch from '../../branches/UserLift'
import './styles.css'

const UserLifts = () => {
    const className = 'UserLifts'
    return (
        <div className={className}>
            <h1 className={`${className}_header`}>Your Recent Lifts</h1>
            <UserLiftBranch/>
            <UserLiftBranch/>
            <UserLiftBranch/>
            <UserLiftBranch/>
            <UserLiftBranch/>
        </div>
    )
}

export default UserLifts