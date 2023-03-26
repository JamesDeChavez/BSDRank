import { useContext } from 'react'
import { LandingPageContext } from '../../pages/Landing';
import './styles.css'

const NonAuthNavButtons = () => {
    const { setLoginVisible, setRegisterVisible, setResultsVisible } = useContext(LandingPageContext)

    const navClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, n: number) => {
        e.preventDefault()
        if (n === 1) {
            console.log('login')
            setRegisterVisible(false)
            setResultsVisible(false)
            setLoginVisible(true)
        } else {
            console.log('register')
            setLoginVisible(false)
            setResultsVisible(false)
            setRegisterVisible(true)
        }
    };

    const className = 'NonAuthNavButtons'
    return (
        <div className={className}>
            <div className={`${className}_navbutton`} onClick={(e) => navClick(e, 1)} >Login</div>
            <div className={`${className}_navbutton`} onClick={(e) => navClick(e, 2)} >Register</div>
        </div>
    );
};

export default NonAuthNavButtons