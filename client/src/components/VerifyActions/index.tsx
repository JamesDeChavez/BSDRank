import { ReactComponent as ScaleSVG } from '../../assets/scaleSVG.svg'
import { ReactComponent as BenchSVG } from '../../assets/benchSVG.svg'
import { ReactComponent as SquatSVG } from '../../assets/squatSVG.svg'
import { ReactComponent as DeadliftSVG } from '../../assets/deadliftSVG.svg'
import './styles.css'

interface Props {
    setFormVisible: React.Dispatch<React.SetStateAction<boolean>>,
    setActionSelected: React.Dispatch<React.SetStateAction<string>>
}

const VerifyActions: React.FC<Props> = ({ setFormVisible, setActionSelected }) => {

    const handleActionClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, action: string) => {
        e.preventDefault()
        setActionSelected(action)
        setFormVisible(true)
    }

    const className = 'VerifyActions'
    return (
        <div className={className}>
            <h2 className={`${className}_sectionHeader`}>Verify Updates</h2>
            <div className={`${className}_verifyButtonsContainer`}>
                <button className={`${className}_verifyButton`} onClick={e => handleActionClick(e, 'Weight')}>
                    <ScaleSVG className={`${className}_svg ${className}_scale`}/>
                    <p className={`${className}_verifyButtonText`}>Weight</p>
                </button>
                <button className={`${className}_verifyButton`} onClick={e => handleActionClick(e, 'Bench')}>
                    <BenchSVG className={`${className}_svg`}/>
                    <p className={`${className}_verifyButtonText`}>Bench</p>
                </button>
                <button className={`${className}_verifyButton`} onClick={e => handleActionClick(e, 'Squat')}>
                    <SquatSVG className={`${className}_svg`}/>
                    <p className={`${className}_verifyButtonText`}>Squat</p>
                </button>
                <button className={`${className}_verifyButton`} onClick={e => handleActionClick(e, 'Deadlift')}>
                    <DeadliftSVG className={`${className}_svg`}/>
                    <p className={`${className}_verifyButtonText`}>Deadlift</p>
                </button>
            </div>
        </div>
    )
}

export default VerifyActions