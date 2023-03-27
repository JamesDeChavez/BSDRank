import { useContext } from 'react'
import { client } from '../../index';
import { UserLoggedInContext } from '../../App';
import { AuthRenderContext } from '../../branches/Auth';
import { UserRoleFragment } from '../../graphql/fragments';
import './styles.css'

const AuthNavButtons = () => {
    const {setUserLoggedIn, userId} = useContext(UserLoggedInContext)
    const { role } = client.readFragment({ id: `User:${userId}`, fragment: UserRoleFragment })
    const [RENDERS, setRender] = useContext(AuthRenderContext)

    const handleLogoutClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        client.clearStore()
        localStorage.clear()
        setUserLoggedIn(false)
        
    };

    const handleAdminClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        if (role === 'admin') setRender(RENDERS[4])
    }

    const className = 'NonAuthNavButtons'
    return (
        <div className={className}>
            <button className={`${className}_navbutton`} onClick={handleAdminClick} style={{ display: role === 'admin' ? 'block' : 'none'}}>Admin</button>
            <button className={`${className}_navbutton`} onClick={handleLogoutClick}>Logout</button>
        </div>
    );
};

export default AuthNavButtons;