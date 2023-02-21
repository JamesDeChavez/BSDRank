import './styles.css'

const SubmitLiftForm = () => {
    const className = 'SubmitLiftForm'
    return (
        <div className={className}>
            <form className={`${className}_form`}>
                <h1 className={`${className}_header`}>Submit New Lift</h1>
                <div className={`${className}_inputContainer`}>
                   <label htmlFor="lift">Select Lift:</label>
                   <select name="lift" id="lift">
                        <option value="bench">Bench</option>
                        <option value="squat">Squat</option>
                        <option value="bench">Deadlift</option>
                   </select>
                </div>
                <div className={`${className}_inputContainer`}>
                    <label htmlFor="weight">Weight:</label>
                    <input type="number" name="weight" id="weight" />
                </div>
                <div className={`${className}_inputContainer`}>
                    <label htmlFor="verifyToggle">Submit Verification?</label>
                    <div className={`${className}_radiosContainer`}>
                        <input type="radio" name="yes" id="yes" />
                        <span>yes</span>
                        <input type="radio" name="no" id="no" />
                        <span>no</span>
                    </div>
                </div>
                <div className={`${className}_inputContainer`}>
                    <label htmlFor="verifyLink">Verification Link</label>
                    <input type="url" name="verifyLink" id="verifyLink" />
                </div>
                <div className={`${className}_buttonsContainer`}>
                    <input type="submit" value="Submit Lift" />
                </div>
            </form>
        </div>
    )
}

export default SubmitLiftForm