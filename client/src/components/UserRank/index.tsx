import rankImage from '../../assets/rank.jpg'
import UserWeightBranch from '../../branches/UserWeight'
import './styles.css'

const UserRank = () => {
    const className = 'UserRank'
    return (
        <div className={className}>
            <h1 className={`${className}_header`}>Username's Rank</h1>
            <img className={`${className}_image`} src={rankImage} alt="rank icon" />
            <UserWeightBranch/>
            <div className={`${className}_liftContainer`}>
                <span>Bench:</span>
                <span>225 lbs</span>
            </div>
            <div className={`${className}_liftContainer`}>
                <span>Squat:</span>
                <span>275 lbs</span>
            </div>
            <div className={`${className}_liftContainer`}>
                <span>Deadlift:</span>
                <span>315 lbs</span>
            </div>
        </div>
    )
}

export default UserRank