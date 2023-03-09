import { useContext } from 'react'
import { NonAuthRenderContext } from '../../branches/NonAuth'
import rankChart from '../../assets/BSDRankDistribution.png'
import './styles.css'

const CallToAction = () => {
    const [RENDERS, setRender] = useContext(NonAuthRenderContext)

    const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        setRender(RENDERS[2])
    }

    const className = 'CallToAction'
    return (
        <div className={className}>
            <h2 className={`${className}_header`}>What is a BSD Rank?</h2>
            <p className={`${className}_text`}>Your BSD Rank calculates your total Wilks Score and compares it to the <a href="https://www.openpowerlifting.org/" target="_blank" rel="noreferrer">OpenPowerlifting database</a> of over 1.6 million lifters (rank distribution below).</p>
            <img src={rankChart} alt="BSDRankDistributionChart" className={`${className}_chart`} />
            <p className={`${className}_text`}>Your total Wilks Score is calculated by taking your total 1RM for Bench, Squat and Deadlift, and applying an adjustment based on your sex and bodyweight.</p>
            <p className={`${className}_text`}>If lifts provided are more then 1 rep, then BSD Rank estimates 1RM using the <a href="https://www.nsca.com/contentassets/61d813865e264c6e852cadfe247eae52/nsca_training_load_chart.pdf" target="_blank" rel="noreferrer">National Strength and Conditioning Association(NSCA) Training Load Chart</a>.</p>
            <p className={`${className}_text`}>BSD Rank can help provide data-driven motivation to continue to progress in your weight lifting journey.</p>
            <p className={`${className}_text`}>Create an account now to track your progress and start getting motivated!</p>
            <button className={`${className}_button`} onClick={handleClick}>Create an Account</button>
        </div>
    )
}

export default CallToAction