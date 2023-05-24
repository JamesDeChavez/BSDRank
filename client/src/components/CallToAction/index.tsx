import { useContext } from 'react'
import gsap, { Power1 } from 'gsap'
import ScrollToPlugin from 'gsap/ScrollToPlugin'
import { LandingPageContext } from '../../pages/Landing'
import './styles.css'
import RankChart from '../RankChart'

gsap.registerPlugin(ScrollToPlugin)

const CallToAction = () => {
    const {setResultsVisible, setLoginVisible, setRegisterVisible} = useContext(LandingPageContext)

    const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        setResultsVisible(false)
        setLoginVisible(false)
        setRegisterVisible(true)
        gsap.to(window, { scrollTo: ".Navbar", duration: 1, ease: Power1.easeOut })
    }

    const className = 'CallToAction'
    return (
        <div className={className}>
            <div className={`${className}_container`}>
                <h2 className={`${className}_header`}>What is a BSD Rank?</h2>
                <p className={`${className}_text`}>Your BSD Rank is determined by calculating your total Wilks Score and comparing it to the <a href="https://www.openpowerlifting.org/" target="_blank" rel="noreferrer">OpenPowerlifting database</a> of over 1.6 million lifters (rank distribution below).</p>
                <div className={`${className}_chartContainer`} >
                    <h3 className={`${className}_chartHeader`}>BSD Rank Distribution</h3>
                    <RankChart/>
                </div>
                <p className={`${className}_text`}>Your total Wilks Score is calculated by taking your total 1RM for Bench, Squat and Deadlift, and applying an <a href="https://worldpowerlifting.com/wilks-formula/" target="_blank" rel="noreferrer">adjustment</a> based on your sex and bodyweight.</p>
                <p className={`${className}_text`}>If lifts provided are more then 1 rep, then BSD Rank estimates 1RM using the National Strength and Conditioning Association (NSCA) <a href="https://www.nsca.com/contentassets/61d813865e264c6e852cadfe247eae52/nsca_training_load_chart.pdf" target="_blank" rel="noreferrer">Training Load Chart</a>.</p>
                <p className={`${className}_text`}>BSD Rank can help provide you with data-driven motivation to continue to progress in your weight lifting journey.</p>
                <p className={`${className}_text`}>Create an account now to track your progress and start getting motivated!</p>
                <button className={`${className}_button`} onClick={handleClick}>Create an Account</button>
            </div>
        </div>
    )
}

export default CallToAction