import cache from '../../utils/cache'
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
                    <p>B</p>
                    <p>S</p>
                    <p>D</p>
                </div>
                {cache.leaderboard.map((user, i) => {
                    return <LifterItem key={i} user={user} index={i} />
                })}
            </div>
        </div>
    )
}

export default CommunityTable