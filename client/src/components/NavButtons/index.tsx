import { useContext } from 'react'
import { AuthRenderContext } from '../../branches/Auth'
import classNames from 'classnames'
import './styles.css'

const NavButtons = () => {
    const [RENDERS, setRender, render] = useContext(AuthRenderContext)

    const navButtonClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, n: number) => {
        e.preventDefault()
        setRender(RENDERS[n])
        console.log(render)
    }

    const className = 'NavButtons'
    return (
        <div className={className}>
            <button className={classNames(
                `${className}_button`,
                {[`${className}_active`]: render === RENDERS[0]}
                )} onClick={(e) => navButtonClick(e, 0)}
            >
                <div>[  ]</div>
                <p>Home</p>
            </button>
            <button className={classNames(
                    `${className}_button`,
                    {[`${className}_active`]: render === RENDERS[1]}
                )} onClick={(e) => navButtonClick(e, 1)}
            >
                <div>[  ]</div>
                <p>New Lift</p>
            </button>
            <button className={classNames(
                    `${className}_button`,
                    {[`${className}_active`]: render === RENDERS[2]}
                )} onClick={(e) => navButtonClick(e, 2)}
            >
                <div>[  ]</div>
                <p>Verify Rank</p>
            </button>
            <button className={classNames(
                    `${className}_button`,
                    {[`${className}_active`]: render === RENDERS[3]}
                )} onClick={(e) => navButtonClick(e, 3)}
            >
                <div>[  ]</div>
                <p>Community</p>
            </button>
        </div>
    )
}

export default NavButtons