import { useState, useEffect } from 'react'
import { calculateWilksScore, determineUserRank } from '../../utils/functions'
import { UserData } from '../../utils/interfaces' 
import './styles.css'

interface Props {
    user: UserData,
    index: number
}

const LifterItem: React.FC<Props> = ({ user, index }) => {
    const [rank, setRank] = useState('')

    useEffect(() => {
        const wilksScore = calculateWilksScore({
            weight: user.verified.weight.amount,
            benchWeight: user.verified.bench.amount,
            benchReps: user.verified.bench.reps,
            squatWeight: user.verified.squat.amount,
            squatReps: user.verified.squat.reps,
            deadliftWeight: user.verified.deadlift.amount,
            deadliftReps: user.verified.deadlift.reps,
            sex: user.sex
        })
        const rankId = determineUserRank(wilksScore)
        setRank(rankId.userRank)

    }, [user])

    const className = 'LifterItem'
    return (
        <div className={className}>
            <p className={`${className}_text`}>{index + 1}</p>
            <p className={`${className}_text`}>{user.username}</p>
            <p className={`${className}_text`}>{rank}</p>
            <p className={`${className}_text`}>{`${user.verified.bench.amount} x ${user.verified.bench.reps}`}</p>
            <p className={`${className}_text`}>{`${user.verified.squat.amount} x ${user.verified.squat.reps}`}</p>
            <p className={`${className}_text`}>{`${user.verified.deadlift.amount} x ${user.verified.deadlift.reps}`}</p>
        </div>
    )
}

export default LifterItem