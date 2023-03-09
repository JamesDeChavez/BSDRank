import classNames from 'classnames'
import { useState, useContext, useRef } from 'react'
import { RankSearchContext } from '../../branches/RankSearch'
import { calculateWilksScore, determineUserRank } from '../../utils/functions'
import './styles.css'

const RankSearch = () => {
    const {setResultsVisible, setSearchResults} = useContext(RankSearchContext)
    const [weight, setWeight] = useState(150)
    const [benchWeight, setBenchWeight] = useState(155)
    const [benchReps, setBenchReps] = useState(5)
    const [squatWeight, setSquatWeight] = useState(225)
    const [squatReps, setSquatReps] = useState(5)
    const [deadliftWeight, setDeadliftWeight] = useState(265)
    const [deadliftReps, setDeadliftReps] = useState(5)
    const [gender, setGender] = useState('')
    const weightRef: any = useRef()
    const intervalRef: any = useRef()
    const changeRef: any = useRef()
    const countRef: any = useRef()

    const submitSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!gender) return;

        const userLiftingStats = {
            weight, benchWeight, benchReps, squatWeight, squatReps, deadliftWeight, deadliftReps, gender
        }

        const wilksScore = calculateWilksScore(userLiftingStats)
        const searchResults = determineUserRank(wilksScore)
        
        setSearchResults({
            userRank: {
                rank: searchResults.userRank,
                score: wilksScore
            },
            nextRank: searchResults.nextRank,
            userLiftingStats
        })

        setResultsVisible(prevState => !prevState)
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name
        switch (name) {
            case 'weight':
                setWeight(prevState => e.target.validity.valid ? Number(e.target.value) : prevState); break
            case 'benchWeight':
                setBenchWeight(prevState => e.target.validity.valid ? Number(e.target.value) : prevState); break
            case 'squatWeight':
                setSquatWeight(prevState => e.target.validity.valid ? Number(e.target.value) : prevState); break
            case 'deadliftWeight':
                setDeadliftWeight(prevState => e.target.validity.valid ? Number(e.target.value) : prevState); break
            default: break
        }
    }

    const handleNumberInputButtonClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, name: string, direction: string) => {
        e.preventDefault()
        switch (name) {
            case 'weight':
                if (direction === 'decrease' && weight > 1) setWeight(prevState => prevState - 1)
                if (direction === 'increase' && weight < 999) setWeight(prevState => prevState + 1)
                break
            case 'benchWeight':
                if (direction === 'decrease' && benchWeight > 1) setBenchWeight(prevState => prevState - 1)
                if (direction === 'increase' && benchWeight < 999) setBenchWeight(prevState => prevState + 1)
                break
            case 'benchReps':
                if (direction === 'decrease' && benchReps > 1) setBenchReps(prevState => prevState - 1)
                if (direction === 'increase' && benchReps < 12) setBenchReps(prevState => prevState + 1)
                break
            case 'squatWeight':
                if (direction === 'decrease' && squatWeight > 1) setSquatWeight(prevState => prevState - 1)
                if (direction === 'increase' && squatWeight < 999) setSquatWeight(prevState => prevState + 1)
                break
            case 'squatReps':
                if (direction === 'decrease' && squatReps > 1) setSquatReps(prevState => prevState - 1)
                if (direction === 'increase' && squatReps < 12) setSquatReps(prevState => prevState + 1)
                break
            case 'deadliftWeight':
                if (direction === 'decrease' && deadliftWeight > 1) setDeadliftWeight(prevState => prevState - 1)
                if (direction === 'increase' && deadliftWeight < 999) setDeadliftWeight(prevState => prevState + 1)
                break
            case 'deadliftReps':
                if (direction === 'decrease' && deadliftReps > 1) setDeadliftReps(prevState => prevState - 1)
                if (direction === 'increase' && deadliftReps < 12) setDeadliftReps(prevState => prevState + 1)
                break
            default: break
        }
    }

    const handleWeightMouseDown = (e: React.MouseEvent<HTMLButtonElement, MouseEvent> | React.TouchEvent<HTMLButtonElement>, name: string, direction: string) => {
        switch (name) {
            case 'weight':
                weightRef.current = weight
                break
            case 'benchWeight':
                weightRef.current = benchWeight
                break
            case 'squatWeight':
                weightRef.current = squatWeight
                break
            case 'deadliftWeight':
                weightRef.current = deadliftWeight
                break
            default: break
        }

        countRef.current = 0
        changeRef.current = 1

        intervalRef.current = setInterval(() => {
            if(countRef.current === 10) changeRef.current = 5
            if(countRef.current === 30) changeRef.current = 10            
            switch (name) {
                case 'weight':
                    if(direction === 'decrease' && weightRef.current > 1) {
                        setWeight(weightRef.current - changeRef.current)
                        weightRef.current = weightRef.current - changeRef.current
                    }
                    if(direction === 'increase' && weightRef.current < 999) {
                        console.log(countRef.current, changeRef.current)
                        setWeight(weightRef.current + changeRef.current)
                        weightRef.current = weightRef.current + changeRef.current
                    }
                    break
                case 'benchWeight':
                    if(direction === 'decrease' && weightRef.current > 1) {
                        setBenchWeight(weightRef.current - changeRef.current)
                        weightRef.current = weightRef.current - changeRef.current
                    }
                    if(direction === 'increase' && weightRef.current < 999) {
                        setBenchWeight(weightRef.current + changeRef.current)
                        weightRef.current = weightRef.current + changeRef.current
                    }
                    break
                case 'squatWeight':
                    if(direction === 'decrease' && weightRef.current > 1) {
                        setSquatWeight(weightRef.current - changeRef.current)
                        weightRef.current = weightRef.current - changeRef.current
                    }
                    if(direction === 'increase' && weightRef.current < 999) {
                        setSquatWeight(weightRef.current + changeRef.current)
                        weightRef.current = weightRef.current + changeRef.current
                    }
                    break
                case 'deadliftWeight':
                    if(direction === 'decrease' && weightRef.current > 1) {
                        setDeadliftWeight(weightRef.current - changeRef.current)
                        weightRef.current = weightRef.current - changeRef.current
                    }
                    if(direction === 'increase' && weightRef.current < 999) {
                        setDeadliftWeight(weightRef.current + changeRef.current)
                        weightRef.current = weightRef.current + changeRef.current
                    }
                    break
                default: break
            }
            countRef.current++
            return () => clearInterval(intervalRef.current)
        }, 100)

    }

    const handleWeightMouseUp = (e: React.MouseEvent<HTMLButtonElement, MouseEvent> | React.TouchEvent<HTMLButtonElement>) => {
        clearInterval(intervalRef.current)
    }

    const className = 'RankSearch'
    return (
        <div className={className}>
            <h2 className={`${className}_header`}>BSD Rank</h2>
            <form className={`${className}_form`} onSubmit={submitSearch}>
                
                <div className={`${className}_formSectionContainer`}>
                    <label htmlFor="weight" className={`${className}_label`}>Body Weight</label>
                    <div className={`${className}_selectBorder`}>
                        <div className={`${className}_buttonSelectContainer`}>
                            <button className={`${className}_numberButton`} onClick={e => handleNumberInputButtonClick(e, 'weight', 'decrease')} onMouseDown={e => handleWeightMouseDown(e, 'weight', 'decrease')} onMouseUp={handleWeightMouseUp} onTouchStart={e => handleWeightMouseDown(e, 'weight', 'decrease')} onTouchEnd={handleWeightMouseUp}>{'<'}</button>
                                <div className={`${className}_inputTextContainer`}>
                                    <input type="text" pattern="[0-9]*" name="weight" id="weight" value={weight.toString()} className={`${className}_numberInput`} onChange={handleInputChange}/>
                                    <span className={`${className}_text`}>{'lbs'}</span>
                                </div>
                            <button className={`${className}_numberButton`} onClick={e => handleNumberInputButtonClick(e, 'weight', 'increase')} onMouseDown={e => handleWeightMouseDown(e, 'weight', 'increase')} onMouseUp={handleWeightMouseUp} onTouchStart={e => handleWeightMouseDown(e, 'weight', 'increase')} onTouchEnd={handleWeightMouseUp}>{'>'}</button>
                        </div>
                    </div>
                        
                </div>

                <div className={`${className}_formSectionContainer`}>
                    <label htmlFor="benchWeight" className={`${className}_label`}>Bench</label>
                    <div className={`${className}_selectBorder`}>
                        <div className={`${className}_buttonSelectContainer`}>
                            <button className={`${className}_numberButton`} onClick={e => handleNumberInputButtonClick(e, 'benchWeight', 'decrease')} onMouseDown={e => handleWeightMouseDown(e, 'benchWeight', 'decrease')} onMouseUp={handleWeightMouseUp} onTouchStart={e => handleWeightMouseDown(e, 'benchWeight', 'decrease')} onTouchEnd={handleWeightMouseUp}>{'<'}</button>
                                <div className={`${className}_inputTextContainer`}>
                                    <input type="text" pattern="[0-9]*" name="benchWeight" id="benchWeight" value={benchWeight.toString()}  className={`${className}_numberInput`} onChange={handleInputChange} />
                                    <span className={`${className}_text`}>{'lbs'}</span>
                                </div>
                            <button className={`${className}_numberButton`} onClick={e => handleNumberInputButtonClick(e, 'benchWeight', 'increase')} onMouseDown={e => handleWeightMouseDown(e, 'benchWeight', 'increase')} onMouseUp={handleWeightMouseUp} onTouchStart={e => handleWeightMouseDown(e, 'benchWeight', 'increase')} onTouchEnd={handleWeightMouseUp}>{'>'}</button>
                        </div>
                        
                        <div className={`${className}_buttonSelectContainer`}>
                            <button className={`${className}_numberButton`} onClick={e => handleNumberInputButtonClick(e, 'benchReps', 'decrease')} >{'<'}</button>
                                <div className={`${className}_inputTextContainer`}>
                                    <input type="text" pattern="[0-9]*" name="benchReps" id="benchReps" value={benchReps} className={`${className}_repsInput`} onChange={handleInputChange} readOnly={true}/>
                                    <span className={`${className}_text`}>{'reps'}</span>
                                </div>
                            <button className={`${className}_numberButton`} onClick={e => handleNumberInputButtonClick(e, 'benchReps', 'increase')} >{'>'}</button>
                        </div>
                    </div>
                </div>

                <div className={`${className}_formSectionContainer`}>
                    <label htmlFor="squatWeight" className={`${className}_label`}>Squat</label>
                    <div className={`${className}_selectBorder`}>
                        <div className={`${className}_buttonSelectContainer`}>
                            <button className={`${className}_numberButton`} onClick={e => handleNumberInputButtonClick(e, 'squatWeight', 'decrease')} onMouseDown={e => handleWeightMouseDown(e, 'squatWeight', 'decrease')} onMouseUp={handleWeightMouseUp} onTouchStart={e => handleWeightMouseDown(e, 'squatWeight', 'decrease')} onTouchEnd={handleWeightMouseUp}>{'<'}</button>
                                <div className={`${className}_inputTextContainer`}>
                                    <input type="text" pattern="[0-9]*" name="squatWeight" id="squatWeight" value={squatWeight.toString()}  className={`${className}_numberInput`} onChange={handleInputChange} />
                                    <span className={`${className}_text`}>{'lbs'}</span>
                                </div>
                            <button className={`${className}_numberButton`} onClick={e => handleNumberInputButtonClick(e, 'squatWeight', 'increase')} onMouseDown={e => handleWeightMouseDown(e, 'squatWeight', 'increase')} onMouseUp={handleWeightMouseUp} onTouchStart={e => handleWeightMouseDown(e, 'squatWeight', 'increase')} onTouchEnd={handleWeightMouseUp}>{'>'}</button>
                        </div>
                        
                        <div className={`${className}_buttonSelectContainer`}>
                            <button className={`${className}_numberButton`} onClick={e => handleNumberInputButtonClick(e, 'squatReps', 'decrease')}>{'<'}</button>
                                <div className={`${className}_inputTextContainer`}>
                                    <input type="text" pattern="[0-9]*" name="squatReps" id="squatReps" value={squatReps} className={`${className}_repsInput`} onChange={handleInputChange} />
                                    <span className={`${className}_text`}>{'reps'}</span>
                                </div>
                            <button className={`${className}_numberButton`} onClick={e => handleNumberInputButtonClick(e, 'squatReps', 'increase')}>{'>'}</button>
                        </div>
                    </div>
                </div>

                <div className={`${className}_formSectionContainer`}>
                    <label htmlFor="deadliftWeight" className={`${className}_label`}>Deadlift</label>
                    <div className={`${className}_selectBorder`}>
                        <div className={`${className}_buttonSelectContainer`}>
                            <button className={`${className}_numberButton`} onClick={e => handleNumberInputButtonClick(e, 'deadliftWeight', 'decrease')} onMouseDown={e => handleWeightMouseDown(e, 'deadliftWeight', 'decrease')} onMouseUp={handleWeightMouseUp} onTouchStart={e => handleWeightMouseDown(e, 'deadliftWeight', 'decrease')} onTouchEnd={handleWeightMouseUp}>{'<'}</button>
                                <div className={`${className}_inputTextContainer`}>
                                    <input type="text" pattern="[0-9]*" name="deadliftWeight" id="deadliftWeight" value={deadliftWeight.toString()}  className={`${className}_numberInput`} onChange={handleInputChange}/>
                                    <span className={`${className}_text`}>{'lbs'}</span>
                                </div>
                            <button className={`${className}_numberButton`} onClick={e => handleNumberInputButtonClick(e, 'deadliftWeight', 'increase')} onMouseDown={e => handleWeightMouseDown(e, 'deadliftWeight', 'increase')} onMouseUp={handleWeightMouseUp} onTouchStart={e => handleWeightMouseDown(e, 'deadliftWeight', 'increase')} onTouchEnd={handleWeightMouseUp}>{'>'}</button>
                        </div>
                        
                        <div className={`${className}_buttonSelectContainer`}>
                            <button className={`${className}_numberButton`} onClick={e => handleNumberInputButtonClick(e, 'deadliftReps', 'decrease')}>{'<'}</button>
                                <div className={`${className}_inputTextContainer`}>
                                    <input type="text" pattern="[0-9]*" name="deadliftReps" id="deadliftReps" value={deadliftReps} className={`${className}_repsInput`} onChange={handleInputChange} />
                                    <span className={`${className}_text`}>{'reps'}</span>
                                </div>
                            <button className={`${className}_numberButton`} onClick={e => handleNumberInputButtonClick(e, 'deadliftReps', 'increase')}>{'>'}</button>
                        </div>
                    </div>
                </div>

                <div className={`${className}_formSectionContainer`}>
                    <label htmlFor="gender" className={`${className}_label`}>Gender</label>
                    <div className={`${className}_genderButtonsContainer`}>
                        <button 
                            className={classNames(
                                `${className}_genderButton`,
                                {[`${className}_genderSelected`]: gender === 'MALE' } 
                            )} 
                            onClick={(e) => {
                                e.preventDefault(); setGender('MALE')
                        }}>Male</button>
                        <button 
                            className={classNames(
                                `${className}_genderButton`,
                                {[`${className}_genderSelected`]: gender === 'FEMALE' } 
                            )} 
                            onClick={(e) => {
                                e.preventDefault(); setGender('FEMALE')
                        }}>Female</button>
                    </div>
                </div>

                <input type="submit" value='Calculate BSD Rank' className={`${className}_submitButton`} />
            </form>            
        </div>
    )
}

export default RankSearch