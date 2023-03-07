import { useContext } from 'react'
import { NonAuthRenderContext } from '../../branches/NonAuth';
import './styles.css'

const NonAuthNavButtons = () => {
    const [RENDERS, setRender] = useContext(NonAuthRenderContext);

    const navClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, n: number) => {
        e.preventDefault();
        setRender(RENDERS[n]);
    };

    const className = 'NonAuthNavButtons'
    return (
        <div className={className}>
            <div className={`${className}_navbutton`} onClick={(e) => navClick(e, 1)} >Login</div>
            <div className={`${className}_navbutton`} onClick={(e) => navClick(e, 2)} >Register</div>
        </div>
    );
};

export default NonAuthNavButtons;