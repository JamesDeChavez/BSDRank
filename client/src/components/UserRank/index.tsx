import { useContext, useEffect, useState } from 'react'
import { RankSearchContext } from '../../branches/RankSearch'
import { convertRankToString, calculateWilksScore, determineUserRank } from '../../utils/functions'
import { ReactComponent as DeadliftSVG } from '../../assets/deadliftSVG.svg'
import { ReactComponent as BenchSVG } from '../../assets/benchSVG.svg'
import { ReactComponent as SquatSVG } from '../../assets/squatSVG.svg'
import UserWeightItem from './UserWeightItem'
import { LiftingStats } from '../../utils/interfaces'
import './styles.css'

interface Props {
    liftingData?: LiftingStats,
    bestLiftsData?: LiftingStats
}

const UserRank: React.FC<Props> = ({ liftingData, bestLiftsData }) => {
    let { searchResults, setResultsVisible } = useContext(RankSearchContext)
    const [rank, setRank] = useState('b3')
    const [rankString, setRankString] = useState('')
    const [verified, setVerified] = useState('Unverified')
    const [progress, setProgress] = useState(0)
    const [benchWeight, setBenchWeight] = useState(0)
    const [benchReps, setBenchReps] = useState(0)
    const [squatWeight, setSquatWeight] = useState(0)
    const [squatReps, setSquatReps] = useState(0)
    const [deadliftWeight, setDeadliftWeight] = useState(0)
    const [deadliftReps, setDeadliftReps] = useState(0)
    const [weight, setWeight] = useState(0)
    const [sex, setSex] = useState('MALE')
    const rankImage = require(`../../assets/${rank?.toLowerCase()}.png`)
    
    useEffect(() => {
        if (!searchResults && liftingData) {
            const wilksScore = calculateWilksScore(liftingData)
            const { userRank, nextRank } = determineUserRank(wilksScore)
            setRank(userRank)
            setRankString(convertRankToString(userRank))
            setVerified('Unverified')
            setProgress(Math.floor(nextRank.percentageToNext*100))
            setBenchWeight(liftingData.benchWeight)
            setBenchReps(liftingData.benchReps)
            setSquatWeight(liftingData.squatWeight)
            setSquatReps(liftingData.squatReps)
            setDeadliftWeight(liftingData.deadliftWeight)
            setDeadliftReps(liftingData.deadliftReps)
            setWeight(liftingData.weight)
            setSex(liftingData.sex)
        }
        if (searchResults) {
            setRank(searchResults.userRank.rank)
            setRankString(convertRankToString(searchResults.userRank.rank))
            setVerified('Unverified')
            setProgress(Math.floor(searchResults.nextRank.percentageToNext*100))
            setBenchWeight(searchResults.userLiftingStats.benchWeight)
            setBenchReps(searchResults.userLiftingStats.benchReps)
            setSquatWeight(searchResults.userLiftingStats.squatWeight)
            setSquatReps(searchResults.userLiftingStats.squatReps)
            setDeadliftWeight(searchResults.userLiftingStats.deadliftWeight)
            setDeadliftReps(searchResults.userLiftingStats.deadliftReps)
            setWeight(searchResults.userLiftingStats.weight)
            setSex(searchResults.userLiftingStats.sex)
        }
    }, [searchResults, liftingData])

    const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        setResultsVisible(false)
    }

    const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        e.preventDefault()
        const selection = e.target.value
        setVerified(selection)
    }

    useEffect(() => {
        switch (verified) {
            case 'Unverified':
                if (liftingData) {
                    const wilksScore = calculateWilksScore(liftingData)
                    const { userRank, nextRank } = determineUserRank(wilksScore)
                    setRank(userRank)
                    setRankString(convertRankToString(userRank))
                    setProgress(Math.floor(nextRank.percentageToNext*100))
                    setBenchWeight(liftingData.benchWeight)
                    setBenchReps(liftingData.benchReps)
                    setSquatWeight(liftingData.squatWeight)
                    setSquatReps(liftingData.squatReps)
                    setDeadliftWeight(liftingData.deadliftWeight)
                    setDeadliftReps(liftingData.deadliftReps)
                    setWeight(liftingData.weight)
                    setSex(liftingData.sex) 
                }
                break
            case 'Verified':
                if (bestLiftsData) {
                    const wilksScore = calculateWilksScore(bestLiftsData)
                    const { userRank, nextRank } = determineUserRank(wilksScore)
                    setRank(userRank)
                    setRankString(convertRankToString(userRank))
                    setProgress(Math.floor(nextRank.percentageToNext*100))
                    setBenchWeight(bestLiftsData.benchWeight)
                    setBenchReps(bestLiftsData.benchReps)
                    setSquatWeight(bestLiftsData.squatWeight)
                    setSquatReps(bestLiftsData.squatReps)
                    setDeadliftWeight(bestLiftsData.deadliftWeight)
                    setDeadliftReps(bestLiftsData.deadliftReps)
                    setWeight(bestLiftsData.weight)
                    setSex(bestLiftsData.sex) 
                }
                break
            default: break
        }
    }, [verified, bestLiftsData, liftingData])


    const className = 'UserRank'
    return (
        <div className={className}>
            <h1 className={`${className}_header`}>Your BSD Rank</h1>
            <div className={`${className}_rankContainer`}>
                <img className={`${className}_image`} src={rankImage} alt="rank icon" />
                <div className={`${className}_rankTextContainer`}>
                    <p className={`${className}_text`}>{`${rankString}: `}</p>
                    {searchResults ?
                        <p className={`${className}_text`}>Unverified</p>    
                    :
                        <select className={`${className}_select`} name="verified" id="verified" onChange={handleSelect} value={verified}>
                            <option value="Unverified" >Unverified</option>
                            <option value="Verified" >Verified</option>
                        </select>
                    }    
                
                </div>
                <div className={`${className}_rankProgressContainer`}>
                    <div className={`${className}_rankBarContainer`}>
                        <div className={`${className}_rankBar`} style={{width: `${progress}%`}} ></div>
                    </div>
                    <p className={`${className}_text`}>{`${progress}% to next rank`}</p>
                </div>
            </div>
            <p className={`${className}_text ${className}_sex`}>{`Sex: ${sex}`}</p>
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
            <div className={`${className}_buttonContainer`} style={{display: searchResults ? 'block' : 'none'}}>
                <button className={`${className}_button`} onClick={handleButtonClick}>Return to Rank Search</button>
            </div>
        </div>
    )
}

export default UserRank