import { useContext } from 'react'
import { UserLoggedInContext } from '../../App';
import './styles.css'

const AuthNavButtons = () => {
    const [_, setUserLoggedIn] = useContext(UserLoggedInContext)

    const navClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.preventDefault();
        setUserLoggedIn(prevState => !prevState)
    };

    const className = 'NonAuthNavButtons'
    return (
        <div className={className}>
            <div 
                className={`${className}_navbutton`}
                onClick={navClick}
            >Logout</div>
        </div>
    );
};

export default AuthNavButtons;