import { useQuery } from '@apollo/client'
import { GET_LEADERBOARD } from '../../graphql/query'
import LifterItem from '../LifterItem'
import './styles.css'
import Loading from '../Loading'

const CommunityTable = () => {
    const { data, loading } = useQuery(GET_LEADERBOARD)

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
                <div className={`${className}_table`} style={{display: loading ? 'none' : 'block' }}>
                    {data && data.leaderboard.leaderboard.length ? 
                        data.leaderboard.leaderboard.map((leader: {userId: number, wilksScore: number}, i: number) => {
                            return <LifterItem key={i} leader={leader} index={i} />
                        })
                    :
                        <p style={{ padding: '0.5rem' }}>No verified users</p>
                    }
                </div>
                <Loading loading={loading} />
            </div>
        </div>
    )
}

export default CommunityTable