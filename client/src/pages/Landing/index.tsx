import RankSearchBranch from "../../branches/RankSearch"
import CallToAction from "../../components/CallToAction"
import Footer from "../../components/Footer"
import Navbar from "../../components/Navbar"
import RecentLifts from "../../components/CommunityTable"
import './styles.css'

const LandingPage = () => {
    
    const className = 'LandingPage'
    return (
        <div className={className}>
            <Navbar/>
            <div className={`${className}_main`}>
                <RankSearchBranch/>
                <CallToAction/>
                <RecentLifts/>
            </div>
            <Footer/>
        </div>
    )
}

export default LandingPage