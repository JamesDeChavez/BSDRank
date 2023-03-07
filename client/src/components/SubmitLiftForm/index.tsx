import { useState } from 'react'
import classNames from 'classnames'
import './styles.css'

const SubmitLiftForm = () => {
    const LIFT_OPTIONS = ['BENCH', 'SQUAT', 'DEADLIFT']
    const [lift, setLift] = useState('')

    const handleLiftClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, n: number) => {
        e.preventDefault()
        setLift(LIFT_OPTIONS[n])
    }

    const className = 'SubmitLiftForm'
    return (
        <div className={className}>
            <form className={`${className}_form`}>
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
                    <div className={`${className}_weightSelectionContainer`}>
                        <button>Left</button>
                        <p className={`${className}_weightText`}>225</p>
                        <button>Right</button>
                    </div>
                </div>
                <div className={`${className}_inputContainer`}>
                    <label htmlFor="sets">Sets:</label>
                    <div className={`${className}_setsSelectionContainer`}>
                        <button>Left</button>
                        <p className={`${className}_setsText`}>5</p>
                        <button>Right</button>
                    </div>
                </div>
                <div className={`${className}_inputContainer`}>
                    <label htmlFor="reps">Reps:</label>
                    <div className={`${className}_repsSelectionContainer`}>
                        <button>Left</button>
                        <p className={`${className}_repsText`}>5</p>
                        <button>Right</button>
                    </div>
                </div>
                <div className={`${className}_buttonsContainer`}>
                    <input type="submit" value="Submit Lift" />
                </div>
            </form>
        </div>
    )
}

export default SubmitLiftForm