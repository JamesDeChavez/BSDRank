import RankSearchBranch from "../../branches/RankSearch"
import CallToAction from "../../components/CallToAction"
import Footer from "../../components/Footer"
import Navbar from "../../components/Navbar"
import RecentLifts from "../../components/RecentLifts"
import TopLifts from "../../components/TopLifts"
import './styles.css'

const LandingPage = () => {
    
    const className = 'LandingPage'
    return (
        <div className={className}>
            <Navbar/>
            <RankSearchBranch/>
            <TopLifts/>
            <RecentLifts/>
            <CallToAction/>
            <Footer/>
        </div>
    )
}

export default LandingPage