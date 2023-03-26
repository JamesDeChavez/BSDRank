import { useContext } from 'react'
import { AuthRenderContext } from '../../branches/Auth';
import { LandingPageContext } from '../../pages/Landing';
import './styles.css'

interface Props {
    userLoggedIn: boolean
}

const NavLogo: React.FC<Props> = ({userLoggedIn}) => {
    const { setLoginVisible, setRegisterVisible, setResultsVisible } = useContext(LandingPageContext)
    const [RENDERS_Auth, setRender_Auth] = useContext(AuthRenderContext)


    const logoClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.preventDefault()
        if (userLoggedIn) setRender_Auth(RENDERS_Auth[0])
        else {
            setLoginVisible(false)
            setRegisterVisible(false)
            setResultsVisible(false)
        }
    }

    const className = 'NavLogo'
    return (
        <div className={className} onClick={logoClick}>BSD Rank</div>
    )
}

export default NavLogo