import rankImage from '../../assets/rank.jpg'
import UserWeightBranch from '../../branches/UserWeight'
import './styles.css'

const UserRank = () => {
    const className = 'UserRank'
    return (
        <div className={className}>
            <h1 className={`${className}_header`}>Your Rank</h1>
            <div className={`${className}_rankContainer`}>
                <img className={`${className}_image`} src={rankImage} alt="rank icon" />
                <p>Platinum III: Verified</p>
            </div>
            <UserWeightBranch/>            
            <div className={`${className}_liftsSection`}>
                <div className={`${className}_liftContainer`}>
                    <div>[  ]</div>
                    <p>Bench</p>
                    <p>225 lbs</p>
                </div>
                <div className={`${className}_liftContainer`}>
                    <div>[  ]</div>
                    <p>Squat</p>
                    <p>275 lbs</p>
                </div>
                <div className={`${className}_liftContainer`}>
                    <div>[  ]</div>
                    <p>Deadlift</p>
                    <p>315 lbs</p>
                </div>
            </div>
        </div>
    )
}

export default UserRank