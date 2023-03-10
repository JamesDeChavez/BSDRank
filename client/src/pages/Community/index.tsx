import Navbar from "../../components/Navbar";
import NavButtons from "../../components/NavButtons";
import RecentLifts from "../../components/CommunityTable";
import './styles.css'

const CommunityPage = () => {
    const className = 'CommunityPage'
    return (
        <div className={className}>
            <Navbar/>
            <div className={`${className}_main`}>
                <RecentLifts/>
            </div>
            <NavButtons/>
        </div>
    );
};

export default CommunityPage;