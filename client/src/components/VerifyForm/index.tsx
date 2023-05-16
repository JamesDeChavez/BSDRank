import { useEffect, useState, useRef, useContext } from 'react'
import { client } from '../../index'
import { UserLoggedInContext } from '../../App'
import { PendingVerifiedFragment, UnverifiedLiftsFragment } from '../../graphql/fragments'
import { useMutation } from '@apollo/client'
import { CREATE_VERIFY_REQUEST, UPDATE_PENDING_VERIFIED } from '../../graphql/mutations'
import './styles.css'
import Loading from '../Loading'

interface Props {
    setFormVisible: React.Dispatch<React.SetStateAction<boolean>>,
    actionSelected: string
}

const VerifyForm: React.FC<Props> = ({ setFormVisible, actionSelected }) => {
    const { userId } = useContext(UserLoggedInContext)
    const pendingVerifiedLifts = client.readFragment({ id: `User:${userId}`, fragment: PendingVerifiedFragment }) ?? { pendingVerified: { weight: {amount: 0, videoURL: ''}, bench: { weight: 0, reps: 0, videoURL: '' }, squat: { weight: 0, reps: 0, videoURL: '' }, deadlift: { weight: 0, reps: 0, videoURL: '' } } } 
    const unverifiedLifts = client.readFragment({ id: `User:${userId}`, fragment: UnverifiedLiftsFragment }) ?? { weight: 0, bestLifts: { bench: { weight: 0, reps: 0 }, squat: { weight: 0, reps: 0 }, deadlift: { weight: 0, reps: 0 } }  }
    const [updatePendingVerified, {loading: loading1}] = useMutation(UPDATE_PENDING_VERIFIED)
    const [createVerifyRequest, {loading: loading2}] = useMutation(CREATE_VERIFY_REQUEST)

    const [unverifiedWeight, setUnverifiedWeight] = useState(0)
    const [unverifiedReps, setUnverifiedReps] = useState(0)
    const [videoURL, setVideoURL] = useState('')
    const [weight, setWeight] = useState(0)
    const [reps, setReps] = useState(0)
    const weightRef: any = useRef()
    const countRef: any = useRef()
    const changeRef: any = useRef()
    const intervalRef: any = useRef()

    useEffect(() => {
        switch (actionSelected) {
            case 'Weight':
                setUnverifiedWeight(unverifiedLifts.weight)
                setWeight(unverifiedLifts.weight)
                break
            case 'Bench':
                setUnverifiedWeight(unverifiedLifts.bestLifts.bench.weight)
                setUnverifiedReps(unverifiedLifts.bestLifts.bench.reps)
                setWeight(unverifiedLifts.bestLifts.bench.weight)
                setReps(unverifiedLifts.bestLifts.bench.reps)
                break
            case 'Squat':
                setUnverifiedWeight(unverifiedLifts.bestLifts.squat.weight)
                setUnverifiedReps(unverifiedLifts.bestLifts.squat.reps)
                setWeight(unverifiedLifts.bestLifts.squat.weight)
                setReps(unverifiedLifts.bestLifts.squat.reps)
                break
            case 'Deadlift':
                setUnverifiedWeight(unverifiedLifts.bestLifts.deadlift.weight)
                setUnverifiedReps(unverifiedLifts.bestLifts.deadlift.reps)
                setWeight(unverifiedLifts.bestLifts.deadlift.weight)
                setReps(unverifiedLifts.bestLifts.deadlift.reps)
                break
            default: break
        }
    }, [actionSelected, unverifiedLifts])

    const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setWeight(prevState => e.target.validity.valid ? Number(e.target.value) : prevState)
    }

    const handleNumberInputButtonClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, name: string, direction: string) => {
        e.preventDefault()
        switch (name) {
            case 'weight':
                if (direction === 'decrease' && weight > 1) setWeight(prevState => prevState - 1)
                if (direction === 'increase' && weight < 999) setWeight(prevState => prevState + 1)
                break
            case 'reps':
                if (direction === 'decrease' && reps > 1) setReps(prevState => prevState - 1)
                if (direction === 'increase' && reps < 12) setReps(prevState => prevState + 1)
                break
            default: break
        }
    }

    const handleWeightMouseDown = (e: React.MouseEvent<HTMLButtonElement, MouseEvent> | React.TouchEvent<HTMLButtonElement>, direction: string) => {
        weightRef.current = weight
        countRef.current = 0
        changeRef.current = 1

        intervalRef.current = setInterval(() => {
            if(countRef.current === 10) changeRef.current = 5
            if(countRef.current === 30) changeRef.current = 10

            if(direction === 'decrease' && weightRef.current > 10) {
                setWeight(weightRef.current - changeRef.current)
                weightRef.current = weightRef.current - changeRef.current
            }
            if(direction === 'increase' && weightRef.current < 990) {
                setWeight(weightRef.current + changeRef.current)
                weightRef.current = weightRef.current + changeRef.current
            }    
            countRef.current++
            return () => clearInterval(intervalRef.current)
        }, 100)

    }

    const handleWeightMouseUp = () => {
        clearInterval(intervalRef.current)
    }

    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const liftName = actionSelected.toLowerCase()
        let newPendingVerified = {
            weight: {
                amount: pendingVerifiedLifts.pendingVerified.weight.amount,
                videoURL: pendingVerifiedLifts.pendingVerified.weight.videoURL
            },
            bench: {
                videoURL: pendingVerifiedLifts.pendingVerified.bench.videoURL,
                weight: pendingVerifiedLifts.pendingVerified.bench.weight,
                reps: pendingVerifiedLifts.pendingVerified.bench.reps
            } ,
            squat: {
                videoURL: pendingVerifiedLifts.pendingVerified.squat.videoURL,
                weight: pendingVerifiedLifts.pendingVerified.squat.weight,
                reps: pendingVerifiedLifts.pendingVerified.squat.reps
            } ,
            deadlift: {
                videoURL: pendingVerifiedLifts.pendingVerified.deadlift.videoURL,
                weight: pendingVerifiedLifts.pendingVerified.deadlift.weight,
                reps: pendingVerifiedLifts.pendingVerified.deadlift.reps
            } ,
        }
        if (actionSelected === 'Weight') newPendingVerified['weight'] = { amount: weight, videoURL: videoURL}
        else {
            newPendingVerified = { ...newPendingVerified, [liftName]: { videoURL, weight, reps }}
        }

        try {
            const newVerifyRequest = await createVerifyRequest({ variables: {
                userId: userId, videoUrl: videoURL, weight: weight, reps: reps, lift: actionSelected
            }})
            const updatedUser = await updatePendingVerified({ variables: {
                userId, pendingVerified: newPendingVerified
            }})
            if (newVerifyRequest && updatedUser) setFormVisible(false)

        } catch (error) {
            console.log(error)
        }
    }

    const className = 'VerifyForm'
    return (
        <div className={className}>
            <form className={`${className}_form`} onSubmit={handleFormSubmit}>
                <h2>{`${actionSelected} Verification`}</h2>
                {actionSelected === 'Weight' ?
                    <p>{`Your Current Unverified Weight: ${unverifiedWeight}`}</p>
                :
                    <p>{`Your Best Unverified Lift: ${unverifiedWeight} x ${unverifiedReps}`}</p>
                }
                <div className={`${className}_urlInputContainer`}>
                    <label htmlFor="verifyURL">Video URL</label>
                    <input type="url" name="verifyURL" id="verifyURL" value={videoURL}  onChange={e => setVideoURL(e.target.value)} className={`${className}_urlInput`} autoComplete="off" />
                </div>
                <a href={videoURL} target="_blank" rel="noreferrer" style={{ display: videoURL ? 'block' : 'none' }} className={`${className}_verifyLink`} >Verify Video Link</a>

                <label htmlFor="weight">Confirm Weight</label>
                <div className={`${className}_buttonSelectContainer`}>
                    <button className={`${className}_numberButton`} onClick={e => handleNumberInputButtonClick(e, 'weight', 'decrease')} onMouseDown={e => handleWeightMouseDown(e, 'decrease')} onMouseUp={handleWeightMouseUp} onTouchStart={e => handleWeightMouseDown(e, 'decrease')} onTouchEnd={handleWeightMouseUp}>{'<'}</button>
                    <input type="text" pattern="[0-9]*" name="weight" id="weight" value={weight} className={`${className}_weightInput`} onChange={handleWeightChange} />
                    <button className={`${className}_numberButton`} onClick={e => handleNumberInputButtonClick(e, 'weight', 'increase')} onMouseDown={e => handleWeightMouseDown(e, 'increase')} onMouseUp={handleWeightMouseUp} onTouchStart={e => handleWeightMouseDown(e, 'increase')} onTouchEnd={handleWeightMouseUp}>{'>'}</button>
                </div>
                <label htmlFor="reps" style={{ display: actionSelected === 'Weight' ? 'none' : 'block'}}>Confirm Reps</label>
                <div className={`${className}_buttonSelectContainer`} style={{ display: actionSelected === 'Weight' ? 'none' : 'flex'}}>
                    <button className={`${className}_numberButton`} onClick={e => handleNumberInputButtonClick(e, 'reps', 'decrease')}>{'<'}</button>
                    <input type="text" pattern="[0-9]*" name="reps" id="reps" value={reps} className={`${className}_repsInput`} readOnly={true} />
                    <button className={`${className}_numberButton`} onClick={e => handleNumberInputButtonClick(e, 'reps', 'increase')}>{'>'}</button>
                </div>
                <div className={`${className}_submitContainer`}>
                    <input type="submit" value="Submit" className={`${className}_submitButton`} />
                    <button onClick={() => setFormVisible(false)} className={`${className}_cancelButton`}>Cancel</button>
                </div>
                <Loading loading={loading1 || loading2} />
            </form>            
        </div>
    )
}

export default VerifyForm