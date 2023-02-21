import { useContext } from 'react'
import { AuthRenderContext } from '../../branches/Auth'
import classNames from 'classnames'
import './styles.css'

const NavButtons = () => {
    const [RENDERS, setRender, render] = useContext(AuthRenderContext)

    const navButtonClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, n: number) => {
        e.preventDefault()
        setRender(RENDERS[n])
        console.log(render)
    }

    const className = 'NavButtons'
    return (
        <div className={className}>
            <div className={classNames(
                    `${className}_button`,
                    {[`${className}_active`]: render === RENDERS[0]}
                )}
                onClick={(e) => navButtonClick(e, 0)}
            >Home</div>
            <div className={classNames(
                    `${className}_button`,
                    {[`${className}_active`]: render === RENDERS[1]}
                )} 
                onClick={(e) => navButtonClick(e, 1)}
            >New Lift</div>
            <div className={classNames(
                    `${className}_button`,
                    {[`${className}_active`]: render === RENDERS[2]}
                )} 
                onClick={(e) => navButtonClick(e, 2)}
            >Community</div>
        </div>
    )
}

export default NavButtons