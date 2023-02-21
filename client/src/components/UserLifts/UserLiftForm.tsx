import React from "react"

interface Props {
    visible: boolean
}

const UserLiftForm: React.FC<Props> = ({visible}) => {

    const className = 'UserLiftForm'
    return (
        <div className={className} style={{display: visible ? 'grid' : 'none'}}>
            <form className={`${className}_form`}>
                <label htmlFor="verify">Verification Link:</label>
                <input type="file" name="verify" id="verify" />
            </form>
            <div className={`${className}_buttonsContainer`}>
                <div className={`${className}_button`}>Verify</div>
            </div>
        </div>
    )
}

export default UserLiftForm