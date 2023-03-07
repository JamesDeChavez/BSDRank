import classNames from 'classnames'
import { useState, useContext } from 'react'
import { ResultsVisibleContext } from '../../branches/RankSearch'
import './styles.css'

const RankSearch = () => {
    const setResultsVisible = useContext(ResultsVisibleContext)
    const [weight, setWeight] = useState<number>(145)
    const [benchWeight, setBenchWeight] = useState<number>(155)
    const [benchSets, setBenchSets] = useState(5)
    const [squatWeight, setSquatWeight] = useState<number>(225)
    const [squatSets, setSquatSets] = useState(5)
    const [deadliftWeight, setDeadliftWeight] = useState<number>(265)
    const [deadliftSets, setDeadliftSets] = useState(5)
    const [gender, setGender] = useState<string>()

    const submitSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setResultsVisible(prevState => !prevState)
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name
        switch (name) {
            case 'weight':
                setWeight(prevState => e.target.validity.valid ? Number(e.target.value) : prevState); break
            case 'benchWeight':
                setBenchWeight(prevState => e.target.validity.valid ? Number(e.target.value) : prevState); break
            case 'benchSets':
                setBenchSets(prevState => e.target.validity.valid ? Number(e.target.value) : prevState); break
            case 'squatWeight':
                setSquatWeight(prevState => e.target.validity.valid ? Number(e.target.value) : prevState); break
            case 'squatSets':
                setSquatSets(prevState => e.target.validity.valid ? Number(e.target.value) : prevState); break
            case 'deadliftWeight':
                setDeadliftWeight(prevState => e.target.validity.valid ? Number(e.target.value) : prevState); break
            case 'deadliftSets':
                setDeadliftSets(prevState => e.target.validity.valid ? Number(e.target.value) : prevState); break
            default: break
        }

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
                            <button className={`${className}_numberButton`}>{'<'}</button>
                                <div className={`${className}_inputTextContainer`}>
                                    <input type="text" pattern="[0-9]*" name="weight" id="weight" value={weight} className={`${className}_numberInput`} onChange={handleInputChange}/>
                                    <span className={`${className}_text`}>{'lbs'}</span>
                                </div>
                            <button className={`${className}_numberButton`}>{'>'}</button>
                        </div>
                    </div>
                        
                </div>

                <div className={`${className}_formSectionContainer`}>
                    <label htmlFor="benchWeight" className={`${className}_label`}>Bench</label>
                    <div className={`${className}_selectBorder`}>
                        <div className={`${className}_buttonSelectContainer`}>
                            <button className={`${className}_numberButton`}>{'<'}</button>
                                <div className={`${className}_inputTextContainer`}>
                                    <input type="text" pattern="[0-9]*" name="benchWeight" id="benchWeight" value={benchWeight}  className={`${className}_numberInput`} onChange={handleInputChange} />
                                    <span className={`${className}_text`}>{'lbs'}</span>
                                </div>
                            <button className={`${className}_numberButton`}>{'>'}</button>
                        </div>
                        
                        <div className={`${className}_buttonSelectContainer`}>
                            <button className={`${className}_numberButton`}>{'<'}</button>
                                <div className={`${className}_inputTextContainer`}>
                                    <input type="text" pattern="[0-9]*" name="benchSets" id="benchSets" value={benchSets} className={`${className}_numberInput`} onChange={handleInputChange}/>
                                    <span className={`${className}_text`}>{'sets'}</span>
                                </div>
                            <button className={`${className}_numberButton`}>{'>'}</button>
                        </div>
                    </div>
                </div>

                <div className={`${className}_formSectionContainer`}>
                    <label htmlFor="squatWeight" className={`${className}_label`}>Squat</label>
                    <div className={`${className}_selectBorder`}>
                        <div className={`${className}_buttonSelectContainer`}>
                            <button className={`${className}_numberButton`}>{'<'}</button>
                                <div className={`${className}_inputTextContainer`}>
                                    <input type="text" pattern="[0-9]*" name="squatWeight" id="squatWeight" value={squatWeight}  className={`${className}_numberInput`} onChange={handleInputChange} />
                                    <span className={`${className}_text`}>{'lbs'}</span>
                                </div>
                            <button className={`${className}_numberButton`}>{'>'}</button>
                        </div>
                        
                        <div className={`${className}_buttonSelectContainer`}>
                            <button className={`${className}_numberButton`}>{'<'}</button>
                                <div className={`${className}_inputTextContainer`}>
                                    <input type="text" pattern="[0-9]*" name="squatSets" id="squatSets" value={squatSets} className={`${className}_numberInput`} onChange={handleInputChange} />
                                    <span className={`${className}_text`}>{'sets'}</span>
                                </div>
                            <button className={`${className}_numberButton`}>{'>'}</button>
                        </div>
                    </div>
                </div>

                <div className={`${className}_formSectionContainer`}>
                    <label htmlFor="deadliftWeight" className={`${className}_label`}>Deadlift</label>
                    <div className={`${className}_selectBorder`}>
                        <div className={`${className}_buttonSelectContainer`}>
                            <button className={`${className}_numberButton`}>{'<'}</button>
                                <div className={`${className}_inputTextContainer`}>
                                    <input type="text" pattern="[0-9]*" name="deadliftWeight" id="deadliftWeight" value={deadliftWeight}  className={`${className}_numberInput`} onChange={handleInputChange}/>
                                    <span className={`${className}_text`}>{'lbs'}</span>
                                </div>
                            <button className={`${className}_numberButton`}>{'>'}</button>
                        </div>
                        
                        <div className={`${className}_buttonSelectContainer`}>
                            <button className={`${className}_numberButton`}>{'<'}</button>
                                <div className={`${className}_inputTextContainer`}>
                                    <input type="text" pattern="[0-9]*" name="deadliftSets" id="deadliftSets" value={deadliftSets} className={`${className}_numberInput`} onChange={handleInputChange} />
                                    <span className={`${className}_text`}>{'sets'}</span>
                                </div>
                            <button className={`${className}_numberButton`}>{'>'}</button>
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