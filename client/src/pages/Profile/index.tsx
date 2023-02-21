import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';
import NavButtons from '../../components/NavButtons';
import UserLifts from '../../components/UserLifts';
import UserRank from '../../components/UserRank';
import './styles.css'

const ProfilePage = () => {
    const className = 'ProfilePage'
    return (
        <div className={className}>
            <Navbar/>
            <NavButtons/>
            <UserRank/>
            <UserLifts/>
            <Footer/>
        </div>
    );
};

export default ProfilePage;