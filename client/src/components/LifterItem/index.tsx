import { useQuery } from '@apollo/client'
import { useState, useEffect } from 'react'
import { GET_USER } from '../../graphql/query'
import { determineUserRank } from '../../utils/functions'
import './styles.css'

interface Props {
    leader: {
        userId: number,
        wilksScore: number
    },
    index: number
}

const LifterItem: React.FC<Props> = ({ leader, index }) => {
    const { data } = useQuery(GET_USER, { variables: { userId: leader.userId }})

    const [rank, setRank] = useState('')

    useEffect(() => {
        const rankId = determineUserRank(leader.wilksScore)
        setRank(rankId.userRank)

    }, [leader])

    const className = 'LifterItem'
    return (
        <div className={className}>
            {data ?
            <>
                <p className={`${className}_text`}>{index + 1}</p>
                <p className={`${className}_text`}>{data.user.username}</p>
                <p className={`${className}_text`}>{rank}</p>
                <p className={`${className}_text`}>{`${data.user.verified.bench.weight} x ${data.user.verified.bench.reps}`}</p>
                <p className={`${className}_text`}>{`${data.user.verified.squat.weight} x ${data.user.verified.squat.reps}`}</p>
                <p className={`${className}_text`}>{`${data.user.verified.deadlift.weight} x ${data.user.verified.deadlift.reps}`}</p>
            </>
            :

                <p className={`${className}_text ${className}_none`}>No Fully Verified Users</p>
            }            
        </div>
    )
}

export default LifterItem