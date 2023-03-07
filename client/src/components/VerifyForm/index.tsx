import './styles.css'

interface Props {
    setFormVisible: React.Dispatch<React.SetStateAction<boolean>>
}

const VerifyForm: React.FC<Props> = ({ setFormVisible }) => {
    const className = 'VerifyForm'
    return (
        <div className={className}>
            <h2>Bench Verication</h2>
            <p>Your Current Verified Lift: 265 x 5</p>
            <p>Your Best Unverified Lift: 270 x 5</p>
            <form className={`${className}_form`}>
                <div className={`${className}_urlInputContainer`}>
                    <label htmlFor="verifyURL">Video URL</label>
                    <input type="url" name="verifyURL" id="verifyURL" />
                </div>
                <label htmlFor="weight">Weight</label>
                <div className={`${className}_buttonSelectContainer`}>
                    <button>Left</button>
                    <input type="number" name="weight" id="weight" />
                    <button>Right</button>
                </div>
                <label htmlFor="sets">Sets</label>
                <div className={`${className}_buttonSelectContainer`}>
                    <button>Left</button>
                    <input type="number" name="sets" id="sets" />
                    <button>Right</button>
                </div>
                <div className={`${className}_submitContainer`}>
                    <input type="submit" value="Submit" />
                    <button onClick={() => setFormVisible(false)}>Cancel</button>
                </div>
            </form>            
        </div>
    )
}

export default VerifyForm