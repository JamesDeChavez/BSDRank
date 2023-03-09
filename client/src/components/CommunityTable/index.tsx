import LifterItem from '../LifterItem'
import './styles.css'

const CommunityTable = () => {
    const className = 'CommunityTable'
    return (
        <div className={className}>
            <h2 className={`${className}_header`}>BSD Leaderboard</h2>
            <div className={`${className}_table`}>
                <div className={`${className}_tableHeaders`}>
                    <p>#</p>
                    <p>User</p>
                    <p>Rank</p>
                    <p>Bench</p>
                    <p>Squat</p>
                    <p>Deadlift</p>
                </div>
                {Array(10).fill('').map((user, i) => {
                    return <LifterItem key={i}/>
                })}
            </div>
        </div>
    )
}

export default CommunityTable