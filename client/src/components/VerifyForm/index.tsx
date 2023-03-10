import { useEffect, useState, useRef } from 'react'
import cache from '../../utils/cache'
import './styles.css'

interface Props {
    setFormVisible: React.Dispatch<React.SetStateAction<boolean>>,
    actionSelected: string
}

const VerifyForm: React.FC<Props> = ({ setFormVisible, actionSelected }) => {
    const [unverifiedWeight, setUnverifiedWeight] = useState(0)
    const [unverifiedReps, setUnverifiedReps] = useState(0)
    const [videoUrl, setVideoUrl] = useState('')
    const [weight, setWeight] = useState(0)
    const [reps, setReps] = useState(0)
    const weightRef: any = useRef()
    const countRef: any = useRef()
    const changeRef: any = useRef()
    const intervalRef: any = useRef()

    useEffect(() => {
        switch (actionSelected) {
            case 'Weight':
                setUnverifiedWeight(cache.user.weight)
                setWeight(cache.user.weight)
                break
            case 'Bench':
                setUnverifiedWeight(cache.user.bestLifts.bench.weight)
                setUnverifiedReps(cache.user.bestLifts.bench.reps)
                setWeight(cache.user.bestLifts.bench.weight)
                setReps(cache.user.bestLifts.bench.reps)
                break
            case 'Squat':
                setUnverifiedWeight(cache.user.bestLifts.squat.weight)
                setUnverifiedReps(cache.user.bestLifts.squat.reps)
                setWeight(cache.user.bestLifts.squat.weight)
                setReps(cache.user.bestLifts.squat.reps)
                break
            case 'Deadlift':
                setUnverifiedWeight(cache.user.bestLifts.deadlift.weight)
                setUnverifiedReps(cache.user.bestLifts.deadlift.reps)
                setWeight(cache.user.bestLifts.deadlift.weight)
                setReps(cache.user.bestLifts.deadlift.reps)
                break
            default: break
        }
    }, [actionSelected])

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

    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const verifyData = {
            videoUrl, weight, reps,
            lift: actionSelected
        }
        console.log(verifyData)
        setFormVisible(false)
    }

    const className = 'VerifyForm'
    return (
        <div className={className}>
            <h2>{`${actionSelected} Verification`}</h2>

            {actionSelected === 'Weight' ?
                <p>{`Your Current Unverified Weight: ${unverifiedWeight}`}</p>
            :
                <p>{`Your Last Unverified Lift: ${unverifiedWeight} x ${unverifiedReps}`}</p>
            }

            <form className={`${className}_form`} onSubmit={handleFormSubmit}>
                <div className={`${className}_urlInputContainer`}>
                    <label htmlFor="verifyURL">Video URL</label>
                    <input type="url" name="verifyURL" id="verifyURL" value={videoUrl}  onChange={e => setVideoUrl(e.target.value)} className={`${className}_urlInput`} />
                </div>
                <label htmlFor="weight">Confirm Weight</label>
                <div className={`${className}_buttonSelectContainer`}>
                    <button className={`${className}_numberButton`} onClick={e => handleNumberInputButtonClick(e, 'weight', 'decrease')} onMouseDown={e => handleWeightMouseDown(e, 'decrease')} onMouseUp={handleWeightMouseUp} onTouchStart={e => handleWeightMouseDown(e, 'decrease')} onTouchEnd={handleWeightMouseUp}>{'<'}</button>
                    <input type="text" pattern="[0-9]*" name="weight" id="weight" value={weight} className={`${className}_weightInput`} onChange={handleWeightChange} />
                    <button className={`${className}_numberButton`} onClick={e => handleNumberInputButtonClick(e, 'weight', 'increase')} onMouseDown={e => handleWeightMouseDown(e, 'increase')} onMouseUp={handleWeightMouseUp} onTouchStart={e => handleWeightMouseDown(e, 'increase')} onTouchEnd={handleWeightMouseUp}>{'>'}</button>
                </div>
                <label htmlFor="reps">Confirm Reps</label>
                <div className={`${className}_buttonSelectContainer`}>
                    <button className={`${className}_numberButton`} onClick={e => handleNumberInputButtonClick(e, 'reps', 'decrease')}>{'<'}</button>
                    <input type="text" pattern="[0-9]*" name="reps" id="reps" value={reps} className={`${className}_repsInput`} readOnly={true} />
                    <button className={`${className}_numberButton`} onClick={e => handleNumberInputButtonClick(e, 'reps', 'increase')}>{'>'}</button>
                </div>
                <div className={`${className}_submitContainer`}>
                    <input type="submit" value="Submit" className={`${className}_submitButton`} />
                    <button onClick={() => setFormVisible(false)} className={`${className}_cancelButton`}>Cancel</button>
                </div>
            </form>            
        </div>
    )
}

export default VerifyForm