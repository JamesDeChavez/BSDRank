import { useContext } from 'react'
import { AuthRenderContext } from '../../branches/Auth';
import { NonAuthRenderContext } from '../../branches/NonAuth';
import './styles.css'

interface Props {
    userLoggedIn: boolean
}

const NavLogo: React.FC<Props> = ({userLoggedIn}) => {
    const [RENDERS_NonAuth, setRender_NonAuth] = useContext(NonAuthRenderContext)
    const [RENDERS_Auth, setRender_Auth] = useContext(AuthRenderContext)


    const logoClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.preventDefault()
        if (userLoggedIn) setRender_Auth(RENDERS_Auth[0])
        else setRender_NonAuth(RENDERS_NonAuth[0])
    }

    const className = 'NavLogo'
    return (
        <div className='logoPlaceholder' onClick={logoClick}>LOGO</div>
    )
}

export default NavLogo