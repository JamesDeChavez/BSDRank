import { useContext, useEffect, useState } from 'react'
import { RankSearchContext } from '../../branches/RankSearch'
import { convertRankToString } from '../../utils/functions'
import { ReactComponent as DeadliftSVG } from '../../assets/deadliftSVG.svg'
import { ReactComponent as BenchSVG } from '../../assets/benchSVG.svg'
import { ReactComponent as SquatSVG } from '../../assets/squatSVG.svg'
import UserWeightItem from './UserWeightItem'
import './styles.css'

const UserRank = () => {
    let { searchResults, setResultsVisible } = useContext(RankSearchContext)
    const [rank, setRank] = useState('b3')
    const [rankString, setRankString] = useState('')
    const [verified, setVerified] = useState(false)
    const [progress, setProgress] = useState(0)
    const [benchWeight, setBenchWeight] = useState(0)
    const [benchReps, setBenchReps] = useState(0)
    const [squatWeight, setSquatWeight] = useState(0)
    const [squatReps, setSquatReps] = useState(0)
    const [deadliftWeight, setDeadliftWeight] = useState(0)
    const [deadliftReps, setDeadliftReps] = useState(0)
    const [weight, setWeight] = useState(0)
    const rankImage = require(`../../assets/${rank?.toLowerCase()}.png`)
    
    useEffect(() => {
        if (!searchResults) return
        setRank(searchResults.userRank.rank)
        setRankString(convertRankToString(searchResults.userRank.rank))
        setVerified(false)
        setProgress(Math.floor((searchResults.userRank.score / searchResults.nextRank.scoreNeeded)*100))
        setBenchWeight(searchResults.userLiftingStats.benchWeight)
        setBenchReps(searchResults.userLiftingStats.benchReps)
        setSquatWeight(searchResults.userLiftingStats.squatWeight)
        setSquatReps(searchResults.userLiftingStats.squatReps)
        setDeadliftWeight(searchResults.userLiftingStats.deadliftWeight)
        setDeadliftReps(searchResults.userLiftingStats.deadliftReps)
        setWeight(searchResults.userLiftingStats.weight)
    }, [searchResults])

    const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        setResultsVisible(false)
    }


    const className = 'UserRank'
    return (
        <div className={className}>
            <h1 className={`${className}_header`}>Your BSD Rank</h1>
            <div className={`${className}_rankContainer`}>
                <img className={`${className}_image`} src={rankImage} alt="rank icon" />
                <p className={`${className}_text`}>{`${rankString}: ${verified ? 'Verfified' : 'Unverfied'}`}</p>
                <div className={`${className}_rankProgressContainer`}>
                    <div className={`${className}_rankBarContainer`}>
                        <div className={`${className}_rankBar`} style={{width: `${progress}%`}} ></div>
                    </div>
                    <p>{`${progress}% to next rank`}</p>
                </div>
            </div>
            <UserWeightItem weight={weight} isSearch={searchResults ? true : false} setWeight={setWeight}/>       
            <div className={`${className}_liftsSection`}>
                <div className={`${className}_liftContainer`}>
                    <BenchSVG className={`${className}_svgIcon`} />
                    <p>{`${benchWeight} x ${benchReps}`}</p>
                </div>
                <div className={`${className}_liftContainer`}>
                    <SquatSVG className={`${className}_svgIcon`} />
                    <p>{`${squatWeight} x ${squatReps}`}</p>
                </div>
                <div className={`${className}_liftContainer`}>
                    <DeadliftSVG className={`${className}_svgIcon`} />
                    <p>{`${deadliftWeight} x ${deadliftReps}`}</p>
                </div>
            </div>
            <div className={`${className}_buttonContainer`} >
                <button className={`${className}_button`} onClick={handleButtonClick}>Return to Rank Search</button>
            </div>
        </div>
    )
}

export default UserRank