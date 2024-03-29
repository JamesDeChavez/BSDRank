import Navbar from '../../components/Navbar';
import NavButtons from '../../components/NavButtons';
import Profile from '../../components/Profile';
import UserLifts from '../../components/UserLifts';
import UserRank from '../../components/UserRank';
import './styles.css'

const ProfilePage = () => {

    const className = 'ProfilePage'
    return (
        <div className={className}>
            <Navbar/>
            <div className={`${className}_main`}>
                <UserRank />
                <UserLifts/>
                <Profile />
            </div>
            <NavButtons/>
        </div>
    );
};

export default ProfilePage;