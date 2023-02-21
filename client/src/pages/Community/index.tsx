import FollowedLifters from "../../components/FollowedLifters";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import NavButtons from "../../components/NavButtons";
import RecentLifts from "../../components/RecentLifts";
import TopLifts from "../../components/TopLifts";
import './styles.css'

const CommunityPage = () => {
    const className = 'CommunityPage'
    return (
        <div className={className}>
            <Navbar/>
            <NavButtons/>
            <FollowedLifters/>
            <TopLifts/>
            <RecentLifts/>
            <Footer/>
        </div>
    );
};

export default CommunityPage;