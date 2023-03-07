import './styles.css'

const LastVerifiedStats = () => {
    const className = 'LastVerifiedStats'
    return (
        <div className={className}>
            <h2 className={`${className}_sectionHeader`}>Your Current Verified Stats</h2>
            <div className={`${className}_verifyTextContainer`}>
                <p className={`${className}_verifyText`}>
                    <span>Weight</span> <span>145</span> 
                </p>
                <p className={`${className}_verifyText`}>
                    <span>Bench</span> <span>165 x 5</span> 
                </p>
                <p className={`${className}_verifyText`}>
                    <span>Squat</span> <span>225 x 5</span> 
                </p>
                <p className={`${className}_verifyText`}>
                    <span>Deadlift</span> <span>265 x 5</span> 
                </p>
            </div>
        </div>
    )
}

export default LastVerifiedStats