import { useQuery } from '@apollo/client'
import { GET_LEADERBOARD } from '../../graphql/query'
import LifterItem from '../LifterItem'
import './styles.css'

const CommunityTable = () => {
    const { data } = useQuery(GET_LEADERBOARD)

    const className = 'CommunityTable'
    return (
        <div className={className}>
            <div className={`${className}_container`}>
                <h2 className={`${className}_header`}>BSD Leaderboard</h2>
                <div className={`${className}_tableHeaders`}>
                    <p>#</p>
                    <p>User</p>
                    <p>Rank</p>
                    <p>B</p>
                    <p>S</p>
                    <p>D</p>
                </div>
                <div className={`${className}_table`}>
                    {data && data.leaderboard.leaderboard.map((leader: {userId: number, wilksScore: number}, i: number) => {
                        return <LifterItem key={i} leader={leader} index={i} />
                    })}
                </div>
            </div>
        </div>
    )
}

export default CommunityTable