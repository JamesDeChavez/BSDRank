import { useContext } from 'react'
import { LandingPageContext } from '../../pages/Landing';
import './styles.css'

const NonAuthNavButton = () => {
    const { setLoginVisible, setRegisterVisible, setResultsVisible } = useContext(LandingPageContext)

    const navClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, n: number) => {
        e.preventDefault()
        if (n === 1) {
            setRegisterVisible(false)
            setResultsVisible(false)
            setLoginVisible(true)
        } else {
            setLoginVisible(false)
            setResultsVisible(false)
            setRegisterVisible(true)
        }
    };

    const className = 'NonAuthNavButtons'
    return (
        <div className={className}>
            <button className={`${className}_navbutton`} onClick={(e) => navClick(e, 1)} >Login</button>
            <button className={`${className}_navbutton`} onClick={(e) => navClick(e, 2)} >Register</button>
        </div>
    );
};

export default NonAuthNavButton