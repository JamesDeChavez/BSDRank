import { useContext } from 'react'
import rankImage from '../../assets/rank.jpg'
import { ResultsVisibleContext } from '../../branches/RankSearch'
import './styles.css'

const SearchResults = () => {

    const setResultsVisible = useContext(ResultsVisibleContext)
    const resetSearch = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        setResultsVisible(prevState => !prevState)
    }

    const className = 'SearchResults'
    return (
        <div className={className}>
            <h1 className={`${className}_header`}>Your Rank</h1>
            <img className={`${className}_image`} src={rankImage} alt="rank image"/>
            <div className={`${className}_liftContainer`}>
                <span>Weight:</span>
                <span>145 lbs</span>
            </div>
            <div className={`${className}_liftContainer`}>
                <span>Bench:</span>
                <span>225 lbs</span>
            </div>
            <div className={`${className}_liftContainer`}>
                <span>Squat:</span>
                <span>275 lbs</span>
            </div>
            <div className={`${className}_liftContainer`}>
                <span>Deadlift:</span>
                <span>315 lbs</span>
            </div>
            <button onClick={resetSearch}>Reset Search</button>
        </div>
    )
}

export default SearchResults