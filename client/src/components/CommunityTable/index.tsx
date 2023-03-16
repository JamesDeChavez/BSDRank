import { useQuery } from '@apollo/client'
import { useEffect } from 'react'
import { GET_LEADERBOARD } from '../../graphql/query'
import cache from '../../utils/cache'
import LifterItem from '../LifterItem'
import './styles.css'

const CommunityTable = () => {
    const { data } = useQuery(GET_LEADERBOARD)

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
                {data && data.leaderboard.leaderboard.map((leader: {userId: number, wilksScore: number}, i: number) => {
                    return <LifterItem key={i} leader={leader} index={i} />
                })}
            </div>
        </div>
    )
}

export default CommunityTable