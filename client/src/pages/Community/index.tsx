import Navbar from "../../components/Navbar";
import NavButtons from "../../components/NavButtons";
import CommunityTable from "../../components/CommunityTable";
import './styles.css'

const CommunityPage = () => {
    const className = 'CommunityPage'
    return (
        <div className={className}>
            <Navbar/>
            <div className={`${className}_main`}>
                <CommunityTable/>
            </div>
            <NavButtons/>
        </div>
    );
};

export default CommunityPage;