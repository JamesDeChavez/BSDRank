import { useState, useEffect, useContext } from 'react'
import { UserLoggedInContext } from '../../App'
import { VerifiedLiftsFragment } from '../../graphql/fragments'
import { client } from '../../index'
import './styles.css'

const LastVerifiedStats = () => {
    const { userId } = useContext(UserLoggedInContext)
    const verifiedLifts = client.readFragment({ id: `User:${userId}`, fragment: VerifiedLiftsFragment }) ?? { verified: {weight: {amount: 0}, bench: {weight: 0, reps: 0}, squat: {weight: 0, reps: 0}, deadlift: {weight: 0, reps: 0}}}

    const [weight, setWeight] = useState(0)
    const [benchWeight, setBenchWeight] = useState(0)
    const [benchReps, setBenchReps] = useState(0)
    const [squatWeight, setSquatWeight] = useState(0)
    const [squatReps, setSquatReps] = useState(0)
    const [deadliftWeight, setDeadliftWeight] = useState(0)
    const [deadliftReps, setDeadliftReps] = useState(0)

    useEffect(() => {
        setWeight(verifiedLifts.verified.weight.amount)
        setBenchWeight(verifiedLifts.verified.bench.weight)
        setBenchReps(verifiedLifts.verified.bench.reps)
        setSquatWeight(verifiedLifts.verified.squat.weight)
        setSquatReps(verifiedLifts.verified.squat.reps)
        setDeadliftWeight(verifiedLifts.verified.deadlift.weight)
        setDeadliftReps(verifiedLifts.verified.deadlift.reps)
    }, [verifiedLifts])

    const className = 'LastVerifiedStats'
    return (
        <div className={className}>
            <div className={`${className}_verifyTextContainer`}>
                <h2 className={`${className}_sectionHeader`}>Your Current Verified Stats</h2>
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