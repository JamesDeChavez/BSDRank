import { useContext } from 'react'
import { UserLoggedInContext } from '../../App';
import AuthNavButtons from './AuthNav';
import NavLogo from './NavLogo';
import NonAuthNavButtons from './NonAuthNav';
import './styles.css'

const Navbar = () => {
    const [userLoggedIn, _] = useContext(UserLoggedInContext)

    const className = 'Navbar'
    return (
        <div className={className}>
            <NavLogo userLoggedIn={userLoggedIn} />
            {userLoggedIn ? 
                <AuthNavButtons/>
            :
               <NonAuthNavButtons />
            }
        </div>
    );
};

export default Navbar;