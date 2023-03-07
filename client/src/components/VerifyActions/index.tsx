import './styles.css'

interface Props {
    setFormVisible: React.Dispatch<React.SetStateAction<boolean>>
}

const VerifyActions: React.FC<Props> = ({ setFormVisible }) => {

    const handleActionClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        setFormVisible(true)
    }

    const className = 'VerifyActions'
    return (
        <div className={className}>
            <h2 className={`${className}_sectionHeader`}>Verify Updates</h2>
            <div className={`${className}_verifyButtonsContainer`}>
                <button className={`${className}_verifyButton`} onClick={handleActionClick}>
                    <div>[  ]</div>
                    <p className={`${className}_verifyButtonText`}>Weight</p>
                </button>
                <button className={`${className}_verifyButton`} onClick={handleActionClick}>
                    <div>[  ]</div>
                    <p className={`${className}_verifyButtonText`}>Bench</p>
                </button>
                <button className={`${className}_verifyButton`} onClick={handleActionClick}>
                    <div>[  ]</div>
                    <p className={`${className}_verifyButtonText`}>Squat</p>
                </button>
                <button className={`${className}_verifyButton`} onClick={handleActionClick}>
                    <div>[  ]</div>
                    <p className={`${className}_verifyButtonText`}>Deadlift</p>
                </button>
            </div>
        </div>
    )
}

export default VerifyActions