import { useContext } from 'react'
import { client } from '../../index'
import { UserLoggedInContext } from '../../App'
import './styles.css'
import { PendingVerifiedFragment } from '../../graphql/fragments'

const PendingVerified = () => {
    const { userId } = useContext(UserLoggedInContext)
    const { pendingVerified } = client.readFragment({ id: `User:${userId}`, fragment: PendingVerifiedFragment}) ?? { pendingVerified: { weight: { amount: 0 }, bench: { weight: 0, reps: 0 }, squat: { weight: 0, reps: 0 }, deadlift: { weight: 0, reps: 0 } } }
    console.log('pendingVerified', pendingVerified)

    const className = 'PendingVerified'
    return (
        <div className={className} style={{ display: 
            pendingVerified.weight.amount !== 0 || 
            pendingVerified.bench.weight !== 0 ||
            pendingVerified.squat.weight !== 0 ||
            pendingVerified.deadlift.weight !== 0 ? 'grid' : 'none'
        }}>
            <h2 className={`${className}_sectionHeader`}>Pending Verifications</h2>
            {pendingVerified.weight.amount !== 0 ?
                <div className={`${className}_verifyItem`}>
                    <div className={`${className}_textContainer`}>
                        <span>Weight</span>
                        <span>{pendingVerified.weight.amount}</span>
                    </div>
                    <a target='_blank' rel='noreferrer' href={pendingVerified.weight.videoURL}>Verify Link</a>
                </div>
            :
                <></>
            }
            {pendingVerified.bench.weight !== 0 ?
                <div className={`${className}_verifyItem`}>
                    <div className={`${className}_textContainer`}>
                        <span>Bench</span>
                        <span>{`${pendingVerified.bench.weight} x ${pendingVerified.bench.reps}`}</span>
                    </div>
                    <a target='_blank' rel='noreferrer' href={pendingVerified.bench.videoURL}>Verify Link</a>
                </div>
            :
                <></>
            }
            {pendingVerified.squat.weight !== 0 ?
                <div className={`${className}_verifyItem`}>
                    <div className={`${className}_textContainer`}>
                        <span>Squat</span>
                        <span>{`${pendingVerified.squat.weight} x ${pendingVerified.squat.reps}`}</span>
                    </div>
                    <a target='_blank' rel='noreferrer' href={pendingVerified.squat.videoURL}>Verify Link</a>
                </div>
            :
                <></>
            }
            {pendingVerified.deadlift.weight !== 0 ?
                <div className={`${className}_verifyItem`}>
                    <div className={`${className}_textContainer`}>
                        <span>Deadlift</span>
                        <span>{`${pendingVerified.deadlift.weight} x ${pendingVerified.deadlift.reps}`}</span>
                    </div>
                    <a target='_blank' rel='noreferrer' href={pendingVerified.deadlift.videoURL}>Verify Link</a>
                </div>
            :
                <></>
            }
        </div>
    )
}

export default PendingVerified