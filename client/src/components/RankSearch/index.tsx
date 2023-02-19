import { useContext } from 'react'
import { ResultsVisibleContext } from '../../branches/RankSearch'
import './styles.css'

const RankSearch = () => {
    const setResultsVisible = useContext(ResultsVisibleContext)
    const submitSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setResultsVisible(prevState => !prevState)
    }

    const className = 'RankSearch'
    return (
        <div className={className}>
            <form className={`${className}_form`} onSubmit={submitSearch}>
                <h1 className={`${className}_header`}>Check Your Rank</h1>
                <div className={`${className}_inputContainer`}>
                    <label htmlFor="weight" className={`${className}_label`}>Body Weight (lbs)</label>
                    <input id="weight" type="number" className={`${className}_input`} />
                </div>
                <div className={`${className}_inputContainer`}>
                    <label htmlFor="bench" className={`${className}_label`}>Bench</label>
                    <input id="bench" type="number" className={`${className}_input`} />
                </div>
                <div className={`${className}_inputContainer`}>
                    <label htmlFor="deadlift" className={`${className}_label`}>Deadlift</label>
                    <input id="deadlift" type="number" className={`${className}_input`} />
                </div>
                <div className={`${className}_inputContainer`}>
                    <label htmlFor="squat" className={`${className}_label`}>Squat</label>
                    <input id="squat" type="number" className={`${className}_input`} />
                </div>
                <input type="submit" value='Calculate Rank' />
            </form>            
        </div>
    )
}

export default RankSearch