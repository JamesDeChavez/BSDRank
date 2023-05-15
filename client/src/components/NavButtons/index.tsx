import { useContext } from 'react'
import { AuthRenderContext } from '../../branches/Auth'
import { ReactComponent as HouseSVG } from '../../assets/house-solid.svg'
import { ReactComponent as PlusSVG } from '../../assets/plus-solid.svg'
import { ReactComponent as CheckSVG } from '../../assets/check-solid.svg'
import { ReactComponent as PeopleSVG } from '../../assets/people-group-solid.svg'
import classNames from 'classnames'
import './styles.css'


const NavButtons = () => {
    const [RENDERS, setRender, render] = useContext(AuthRenderContext)

    const navButtonClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, n: number) => {
        e.preventDefault()
        setRender(RENDERS[n])
    }

    const className = 'NavButtons'
    return (
        <div className={className}>
            <button className={classNames(
                `${className}_button`,
                {[`${className}_active`]: render === RENDERS[0]}
                )} onClick={(e) => navButtonClick(e, 0)}
            >
                <HouseSVG data-testid='svgNavIcon' className={`${className}_icon`} />
                <p>Home</p>
            </button>
            <button className={classNames(
                    `${className}_button`,
                    {[`${className}_active`]: render === RENDERS[1]}
                )} onClick={(e) => navButtonClick(e, 1)}
            >
                <PlusSVG data-testid='svgNavIcon' className={`${className}_icon`} />
                <p>New Lift</p>
            </button>
            <button className={classNames(
                    `${className}_button`,
                    {[`${className}_active`]: render === RENDERS[2]}
                )} onClick={(e) => navButtonClick(e, 2)}
            >
                <CheckSVG data-testid='svgNavIcon' className={`${className}_icon`} />
                <p>Verify Rank</p>
            </button>
            <button className={classNames(
                    `${className}_button`,
                    {[`${className}_active`]: render === RENDERS[3]}
                )} onClick={(e) => navButtonClick(e, 3)}
            >
                <PeopleSVG data-testid='svgNavIcon' className={`${className}_icon`} />
                <p>Community</p>
            </button>
        </div>
    )
}

export default NavButtons