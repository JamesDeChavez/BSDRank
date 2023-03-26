import './styles.css'

const Footer = () => {
    const className = 'Footer'
    return (
        <div className={className}>
            <div className={`${className}_citeContainer`}>
                <p className={`${className}_text`}>
                    <span>Squat rack image created with </span>
                    <a href="https://www.midjourney.com/home/?callbackUrl=%2Fapp%2F" target="_blank" rel="noreferrer" >Midjourney</a>
                </p>
                <p className={`${className}_text`}>
                    <span>Rank images used from </span>
                    <a href="https://www.riotgames.com/en" target="_blank" rel="noreferrer" >Riot Games</a>
                </p>
            </div>
            <p className={`${className}_text`}>
                <span>Developed by </span>
                <a href="https://www.jdechavez.com" target="_blank" rel="noreferrer" >James DeChavez</a>
            </p>
        </div>
    )
}

export default Footer