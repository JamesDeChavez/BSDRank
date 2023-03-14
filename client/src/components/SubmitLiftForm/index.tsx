import { useRef, useState, useContext, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import classNames from 'classnames'
import { CREATE_LIFT } from '../../graphql/mutations'
import { UserLoggedInContext } from '../../App'
import { client } from '../../index'
import { UserLiftsFragment, BestLiftsFragment } from '../../graphql/fragments'
import { AuthRenderContext } from '../../branches/Auth'
import { calcOneRepMax } from '../../utils/functions'
import './styles.css'

const SubmitLiftForm = () => {
    const { userId } = useContext(UserLoggedInContext)
    const [ RENDERS, setRender ] = useContext(AuthRenderContext)
    const userLifts = client.readFragment({ id: `User:${userId}`, fragment: UserLiftsFragment })
    const bestLifts = client.readFragment({ id: `User:${userId}`, fragment: BestLiftsFragment })
    const [createLift] = useMutation(CREATE_LIFT)

    useEffect(() => {
        console.log(bestLifts)
    })

    const LIFT_OPTIONS = ['Bench', 'Squat', 'Deadlift']
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

    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const date = new Date()
        const newLiftsData = [{
            lift, weight, reps, date: date.toLocaleDateString()
        }]
        let newBestLifts = {
            bench: {
                weight: bestLifts.bestLifts.bench.weight,
                reps: bestLifts.bestLifts.bench.reps
            } ,
            squat: {
                weight: bestLifts.bestLifts.squat.weight,
                reps: bestLifts.bestLifts.squat.reps
            } ,
            deadlift: {
                weight: bestLifts.bestLifts.deadlift.weight,
                reps: bestLifts.bestLifts.deadlift.reps
            } ,
        }
        
        const liftName = lift.toLowerCase()
        const currentBestWeight = bestLifts.bestLifts[liftName].weight
        const currentBestReps = bestLifts.bestLifts[liftName].reps
        const newBestLiftCheck = calcOneRepMax(weight, reps) > calcOneRepMax(currentBestWeight, currentBestReps)

        if (newBestLiftCheck) newBestLifts = { ...newBestLifts, [liftName]: { weight, reps } }

        userLifts.lifts.forEach((lift: any) => {
            newLiftsData.push({
                date: lift.date,
                lift: lift.lift,
                weight: lift.weight,
                reps: lift.reps
            })
        })

        try {
            const newLifts = await createLift({ variables: {
                userId: userId, lifts: newLiftsData, bestLifts: newBestLifts
            }})
            if (newLifts) setRender(RENDERS[0])
        } catch (error) {
            console.log(error)
        }

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
                            {[`${className}_liftSelected`]: lift === 'Bench' }  
                        )} onClick={(e) => handleLiftClick(e, 0)}>Bench</button>
                        <button className={classNames(
                            `${className}_liftOption`,
                            {[`${className}_liftSelected`]: lift === 'Squat' }  
                        )} onClick={(e) => handleLiftClick(e, 1)}>Squat</button>
                        <button className={classNames(
                            `${className}_liftOption`,
                            {[`${className}_liftSelected`]: lift === 'Deadlift' }  
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