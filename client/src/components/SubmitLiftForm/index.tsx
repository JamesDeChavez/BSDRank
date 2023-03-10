import { useRef, useState } from 'react'
import classNames from 'classnames'
import './styles.css'

const SubmitLiftForm = () => {
    const LIFT_OPTIONS = ['BENCH', 'SQUAT', 'DEADLIFT']
    const [lift, setLift] = useState('')
    const [weight, setWeight] = useState(225)
    const [reps, setReps] = useState(1)
    const weightRef: any = useRef()
    const countRef: any = useRef()
    const changeRef: any = useRef()
    const intervalRef: any = useRef()

    const handleLiftClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, n: number) => {
        e.preventDefault()
        setLift(LIFT_OPTIONS[n])
    }

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
        const liftData = {
            lift, weight, reps, date: new Date()
        }
        console.log(liftData)
    }

    const className = 'SubmitLiftForm'
    return (
        <div className={className}>
            <form className={`${className}_form`} onSubmit={handleFormSubmit}>
                <h1 className={`${className}_header`}>Submit New Lift</h1>
                <div className={`${className}_inputContainer`}>
                   <label htmlFor="lift">Select Lift:</label>
                   <div className={`${className}_liftOptionsContainer`}>
                        <button className={classNames(
                            `${className}_liftOption`,
                            {[`${className}_liftSelected`]: lift === 'BENCH' }  
                        )} onClick={(e) => handleLiftClick(e, 0)}>Bench</button>
                        <button className={classNames(
                            `${className}_liftOption`,
                            {[`${className}_liftSelected`]: lift === 'SQUAT' }  
                        )} onClick={(e) => handleLiftClick(e, 1)}>Squat</button>
                        <button className={classNames(
                            `${className}_liftOption`,
                            {[`${className}_liftSelected`]: lift === 'DEADLIFT' }  
                        )} onClick={(e) => handleLiftClick(e, 2)}>Deadlift</button>
                   </div>
                </div>
                <div className={`${className}_inputContainer`}>
                    <label htmlFor="weight">Weight:</label>
                    <div className={`${className}_selectionContainer`}>
                        <button className={`${className}_numberButton`} onClick={e => handleNumberInputButtonClick(e, 'weight', 'decrease')} onMouseDown={e => handleWeightMouseDown(e, 'decrease')} onMouseUp={handleWeightMouseUp} onTouchStart={e => handleWeightMouseDown(e, 'decrease')} onTouchEnd={handleWeightMouseUp}>{'<'}</button>
                        <input type="text" pattern="[0-9]*" name="weight" id="weight" value={weight} className={`${className}_weightInput`} onChange={handleWeightChange} />
                        <button className={`${className}_numberButton`} onClick={e => handleNumberInputButtonClick(e, 'weight', 'increase')} onMouseDown={e => handleWeightMouseDown(e, 'increase')} onMouseUp={handleWeightMouseUp} onTouchStart={e => handleWeightMouseDown(e, 'increase')} onTouchEnd={handleWeightMouseUp}>{'>'}</button>
                    </div>
                </div>
                <div className={`${className}_inputContainer`}>
                    <label htmlFor="reps">Reps:</label>
                    <div className={`${className}_selectionContainer`}>
                        <button className={`${className}_numberButton`} onClick={e => handleNumberInputButtonClick(e, 'reps', 'decrease')}>{'<'}</button>
                        <input type="text" pattern="[0-9]*" name="reps" id="reps" value={reps} className={`${className}_repsInput`} readOnly={true} />
                        <button className={`${className}_numberButton`} onClick={e => handleNumberInputButtonClick(e, 'reps', 'increase')}>{'>'}</button>
                    </div>
                </div>
                <input type="submit" value="Submit Lift" className={`${className}_submitButton`}/>
            </form>
        </div>
    )
}

export default SubmitLiftForm