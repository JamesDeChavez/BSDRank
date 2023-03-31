import { useContext, useEffect, useState } from 'react'
import { HeroBranchContext } from '../../branches/Hero'
import { convertRankToString, calculateWilksScore, determineUserRank } from '../../utils/functions'
import { UnverifiedLiftsFragment, VerifiedLiftsFragment } from '../../graphql/fragments'
import { client } from '../../index'
import { UserLoggedInContext } from '../../App'
import { ReactComponent as DeadliftSVG } from '../../assets/deadliftSVG.svg'
import { ReactComponent as BenchSVG } from '../../assets/benchSVG.svg'
import { ReactComponent as SquatSVG } from '../../assets/squatSVG.svg'
import UserWeightItem from './UserWeightItem'
import { LandingPageContext } from '../../pages/Landing'
import './styles.css'

const UserRank = () => {
    const { searchResults } = useContext(HeroBranchContext)
    const { setResultsVisible } = useContext(LandingPageContext)
    const { userId } = useContext(UserLoggedInContext)
    const unverifiedLifts = client.readFragment({ id: `User:${userId}`, fragment: UnverifiedLiftsFragment })
    const verifiedLifts = client.readFragment({ id:`User:${userId}`, fragment: VerifiedLiftsFragment})

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
    const [popupVisible, setPopupVisible] = useState(false)
    const [needVerifyVisible, setNeedVerifyVisible] = useState(false)
    const rankImage = require(`../../assets/${rank?.toLowerCase()}.png`)
    
    useEffect(() => {
        if (!searchResults && unverifiedLifts) {
            const liftingStats = {
                weight: unverifiedLifts.weight,
                sex: unverifiedLifts.sex,
                benchWeight: unverifiedLifts.bestLifts.bench.weight,
                benchReps: unverifiedLifts.bestLifts.bench.reps,
                squatWeight: unverifiedLifts.bestLifts.squat.weight,
                squatReps: unverifiedLifts.bestLifts.squat.reps,
                deadliftWeight: unverifiedLifts.bestLifts.deadlift.weight,
                deadliftReps: unverifiedLifts.bestLifts.deadlift.reps,
            }
            const wilksScore = calculateWilksScore(liftingStats)
            const { userRank, nextRank } = determineUserRank(wilksScore)
            setRank(userRank)
            setRankString(convertRankToString(userRank))
            setVerified('Unverified')
            setProgress(Math.floor(nextRank.percentageToNext*100))
            setBenchWeight(unverifiedLifts.bestLifts.bench.weight)
            setBenchReps(unverifiedLifts.bestLifts.bench.reps)
            setSquatWeight(unverifiedLifts.bestLifts.squat.weight)
            setSquatReps(unverifiedLifts.bestLifts.squat.reps)
            setDeadliftWeight(unverifiedLifts.bestLifts.deadlift.weight)
            setDeadliftReps(unverifiedLifts.bestLifts.deadlift.reps)
            setWeight(unverifiedLifts.weight)
            setSex(unverifiedLifts.sex)
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
    }, [searchResults, unverifiedLifts])

    const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        setResultsVisible(false)
    }

    const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        e.preventDefault()
        const selection = e.target.value
        setVerified(selection)
        setNeedVerifyVisible(false)
    }

    useEffect(() => {
        switch (verified) {
            case 'Unverified':
                if (unverifiedLifts) {
                    const liftingStats = {
                        weight: unverifiedLifts.weight,
                        sex: unverifiedLifts.sex,
                        benchWeight: unverifiedLifts.bestLifts.bench.weight,
                        benchReps: unverifiedLifts.bestLifts.bench.reps,
                        squatWeight: unverifiedLifts.bestLifts.squat.weight,
                        squatReps: unverifiedLifts.bestLifts.squat.reps,
                        deadliftWeight: unverifiedLifts.bestLifts.deadlift.weight,
                        deadliftReps: unverifiedLifts.bestLifts.deadlift.reps,
                    }
                    const wilksScore = calculateWilksScore(liftingStats)
                    const { userRank, nextRank } = determineUserRank(wilksScore)
                    setRank(userRank)
                    setRankString(convertRankToString(userRank))
                    setProgress(Math.floor(nextRank.percentageToNext*100))
                    setBenchWeight(unverifiedLifts.bestLifts.bench.weight)
                    setBenchReps(unverifiedLifts.bestLifts.bench.reps)
                    setSquatWeight(unverifiedLifts.bestLifts.squat.weight)
                    setSquatReps(unverifiedLifts.bestLifts.squat.reps)
                    setDeadliftWeight(unverifiedLifts.bestLifts.deadlift.weight)
                    setDeadliftReps(unverifiedLifts.bestLifts.deadlift.reps)
                    setWeight(unverifiedLifts.weight)
                    setSex(unverifiedLifts.sex)
                }
                break
            case 'Verified':
                if (verifiedLifts) {
                    const liftingStats = {
                        weight: verifiedLifts.verified.weight.amount,
                        sex: verifiedLifts.sex,
                        benchWeight: verifiedLifts.verified.bench.weight,
                        benchReps: verifiedLifts.verified.bench.reps,
                        squatWeight: verifiedLifts.verified.squat.weight,
                        squatReps: verifiedLifts.verified.squat.reps,
                        deadliftWeight: verifiedLifts.verified.deadlift.weight,
                        deadliftReps: verifiedLifts.verified.deadlift.reps,
                    }

                    if (liftingStats.weight === 0 || liftingStats.benchWeight === 0 || liftingStats.squatWeight === 0 || liftingStats.deadliftWeight === 0) {
                        setNeedVerifyVisible(true)
                        setRankString('N/A')
                        setRank('b3')
                        setProgress(0)
                        setBenchWeight(verifiedLifts.verified.bench.weight)
                        setBenchReps(verifiedLifts.verified.bench.reps)
                        setSquatWeight(verifiedLifts.verified.squat.weight)
                        setSquatReps(verifiedLifts.verified.squat.reps)
                        setDeadliftWeight(verifiedLifts.verified.deadlift.weight)
                        setDeadliftReps(verifiedLifts.verified.deadlift.reps)
                        setWeight(verifiedLifts.verified.weight.amount)
                        setSex(verifiedLifts.sex)
                    }
                    else {
                        const wilksScore = calculateWilksScore(liftingStats)
                        const { userRank, nextRank } = determineUserRank(wilksScore)
                        setRank(userRank)
                        setRankString(convertRankToString(userRank))
                        setProgress(Math.floor(nextRank.percentageToNext*100))
                        setBenchWeight(verifiedLifts.verified.bench.weight)
                        setBenchReps(verifiedLifts.verified.bench.reps)
                        setSquatWeight(verifiedLifts.verified.squat.weight)
                        setSquatReps(verifiedLifts.verified.squat.reps)
                        setDeadliftWeight(verifiedLifts.verified.deadlift.weight)
                        setDeadliftReps(verifiedLifts.verified.deadlift.reps)
                        setWeight(verifiedLifts.verified.weight.amount)
                        setSex(verifiedLifts.sex) 
                    }
                }
                break
            default: break
        }
    }, [verified, verifiedLifts, unverifiedLifts])


    const className = 'UserRank'
    return (
        <div className={className}>
            <div className={`${className}_topRankSection`}>
                <h1 className={`${className}_header`}>Your BSD Rank</h1>
                <div className={`${className}_rankContainer`}>
                    <div className={`${className}_imageContainer`}>
                        <img className={`${className}_image`} src={rankImage} alt="rank icon" />
                    </div>
                    <div className={`${className}_rankTextContainer`}>
                        <p className={`${className}_text`}>{`${rankString}: `}</p>
                        {searchResults ?
                            <p 
                                className={`${className}_text ${className}_unverified`} 
                                onMouseEnter={e => setPopupVisible(true)} onMouseLeave={e => setPopupVisible(false)} 
                                onTouchStart={e => setPopupVisible(true)} onTouchEnd={e => setPopupVisible(false)} 
                            >
                                    Unverified
                            </p>
                        :
                            <select className={`${className}_select`} name="verified" id="verified" onChange={handleSelect} value={verified}>
                                <option value="Unverified" >Unverified</option>
                                <option value="Verified" >Verified</option>
                            </select>
                        }
                        <div className={`${className}_popupContainer`} style={{display: popupVisible ? 'flex' : 'none'}}>
                            <p className={`${className}_text`}>Create an account to get your verified rank</p>
                        </div>
                        <div className={`${className}_needVerifyContainer`} style={{display: needVerifyVisible ? 'flex' : 'none'}}>
                            <p className={`${className}_text`}>Need full verification for rank</p>
                        </div>
                    </div>
                    <div className={`${className}_rankProgressContainer`}>
                        <div className={`${className}_rankBarContainer`}>
                            <div className={`${className}_rankBar`} style={{width: `${progress}%`}} ></div>
                        </div>
                        <p className={`${className}_text`}>{`${progress}% to next rank`}</p>
                    </div>
                </div>
                <div className={`${className}_sexWeightContainer`}>
                    <p className={`${className}_text ${className}_sex`}>
                        <span>Sex:</span> <span>{sex}</span>
                    </p>
                    <UserWeightItem weight={weight} isSearch={searchResults ? true : false} setWeight={setWeight} verified={verified} />
                </div>
            </div>    
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