import { useContext } from 'react'
import { NonAuthRenderContext } from '../../branches/NonAuth';
import './styles.css'

const Navbar = () => {
    const [RENDERS, setRender] = useContext(NonAuthRenderContext);

    const logoClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.preventDefault();
        setRender(RENDERS[0]);
    };

    const navClick = (e: React.MouseEvent<HTMLLIElement, MouseEvent>, n: number) => {
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
                LOGO PLACEHOLDER
            </div>
            <ul className={`${className}_navbuttonslist`}>
                <li 
                    className={`${className}_navbutton`}
                    onClick={(e) => navClick(e, 1)}
                >Login</li>
                <li 
                    className={`${className}_navbutton`}
                    onClick={(e) => navClick(e, 2)}
                >Register</li>
            </ul>
        </div>
    );
};

export default Navbar;