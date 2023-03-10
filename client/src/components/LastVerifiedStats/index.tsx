import { useState, useEffect } from 'react'
import cache from '../../utils/cache'
import './styles.css'

const LastVerifiedStats = () => {
    const [weight, setWeight] = useState(0)
    const [benchWeight, setBenchWeight] = useState(0)
    const [benchReps, setBenchReps] = useState(0)
    const [squatWeight, setSquatWeight] = useState(0)
    const [squatReps, setSquatReps] = useState(0)
    const [deadliftWeight, setDeadliftWeight] = useState(0)
    const [deadliftReps, setDeadliftReps] = useState(0)

    useEffect(() => {
        setWeight(cache.user.verified.weight.amount)
        setBenchWeight(cache.user.verified.bench.amount)
        setBenchReps(cache.user.verified.bench.reps)
        setSquatWeight(cache.user.verified.squat.amount)
        setSquatReps(cache.user.verified.squat.reps)
        setDeadliftWeight(cache.user.verified.deadlift.amount)
        setDeadliftReps(cache.user.verified.deadlift.reps)
    }, [])

    const className = 'LastVerifiedStats'
    return (
        <div className={className}>
            <h2 className={`${className}_sectionHeader`}>Your Current Verified Stats</h2>
            <div className={`${className}_verifyTextContainer`}>
                <p className={`${className}_verifyText`}>
                    <span>Weight</span> <span>{weight}</span> 
                </p>
                <p className={`${className}_verifyText`}>
                    <span>Bench</span> <span>{`${benchWeight} x ${benchReps}`}</span> 
                </p>
                <p className={`${className}_verifyText`}>
                    <span>Squat</span> <span>{`${squatWeight} x ${squatReps}`}</span> 
                </p>
                <p className={`${className}_verifyText`}>
                    <span>Deadlift</span> <span>{`${deadliftWeight} x ${deadliftReps}`}</span> 
                </p>
            </div>
        </div>
    )
}

export default LastVerifiedStats