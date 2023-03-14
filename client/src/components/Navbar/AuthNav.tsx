import { useApolloClient } from '@apollo/client';
import { useContext } from 'react'
import { UserLoggedInContext } from '../../App';
import './styles.css'

const AuthNavButtons = () => {
    const {setUserLoggedIn} = useContext(UserLoggedInContext)
    const client = useApolloClient()

    const navClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.preventDefault()
        client.clearStore()
        localStorage.clear()
        setUserLoggedIn(false)
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