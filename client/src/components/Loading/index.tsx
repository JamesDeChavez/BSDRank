import { useLayoutEffect, useRef } from "react"
import { gsap } from "gsap"
import './styles.css'

interface Props {
    loading: boolean
}

const Loading: React.FC<Props> = ({ loading }) => {
    const root = useRef(null)

    useLayoutEffect(() => {
        const gsapContext = gsap.context(() => {
            gsap.to(`.${className}_circle1`, { duration: 0.6, opacity: 0, repeat: -1, yoyo: true})
            gsap.to(`.${className}_circle2`, { duration: 0.6, opacity: 0, repeat: -1, yoyo: true, delay: 0.2})
            gsap.to(`.${className}_circle3`, { duration: 0.6, opacity: 0, repeat: -1, yoyo: true, delay: 0.4})
            return () => gsapContext.revert()
        }, root)
    }, [])

    const className = 'Loading'
    return (
        <div className={className} style={{display: loading ? 'flex' : 'none'}} ref={root} >
            <p className={`${className}_loadingText`}>Loading</p>
            <svg viewBox="0 0 100 100" className={`${className}_loadingSvg`} >
                <circle fill="#fff" stroke="none" cx="25" cy="50" r="10" className={`${className}_circle1`} />
                <circle fill="#fff" stroke="none" cx="50" cy="50" r="10" className={`${className}_circle2`} />
                <circle fill="#fff" stroke="none" cx="75" cy="50" r="10" className={`${className}_circle3`} />
            </svg>
        </div>
    )
}

export default Loading