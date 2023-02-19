import { useContext } from 'react'
import { NonAuthRenderContext } from '../../branches/NonAuth';
import './styles.css'

const Navbar = () => {
    const [RENDERS, setRender] = useContext(NonAuthRenderContext);

    const logoClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.preventDefault();
        setRender(RENDERS[0]);
    };

    const navClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, n: number) => {
        e.preventDefault();
        setRender(RENDERS[n]);
    };

    const className = 'Navbar'
    return (
        <div className={className}>
            <div 
                className='logoPlaceholder'
                onClick={logoClick}
            >
                LOGO
            </div>
            <div className={`${className}_navbuttonslist`}>
                <div 
                    className={`${className}_navbutton`}
                    onClick={(e) => navClick(e, 1)}
                >Login</div>
                <div 
                    className={`${className}_navbutton`}
                    onClick={(e) => navClick(e, 2)}
                >Register</div>
            </div>
        </div>
    );
};

export default Navbar;