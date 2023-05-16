import { useContext } from 'react'
import { ReactComponent as ScaleSVG } from '../../assets/scaleSVG.svg'
import { ReactComponent as BenchSVG } from '../../assets/benchSVG.svg'
import { ReactComponent as SquatSVG } from '../../assets/squatSVG.svg'
import { ReactComponent as DeadliftSVG } from '../../assets/deadliftSVG.svg'
import { UserLoggedInContext } from '../../App'
import { client } from '../../index'
import './styles.css'
import { PendingVerifiedFragment } from '../../graphql/fragments'

interface Props {
    setFormVisible: React.Dispatch<React.SetStateAction<boolean>>,
    setActionSelected: React.Dispatch<React.SetStateAction<string>>
}

const VerifyActions: React.FC<Props> = ({ setFormVisible, setActionSelected }) => {
    const { userId } = useContext(UserLoggedInContext)
    const { pendingVerified } = client.readFragment({ id: `User:${userId}`, fragment: PendingVerifiedFragment }) ?? { pendingVerified: { weight: {amount: 0, videoURL: ''}, bench: { weight: 0, reps: 0, videoURL: '' }, squat: { weight: 0, reps: 0, videoURL: '' }, deadlift: { weight: 0, reps: 0, videoURL: '' } } } 

    const handleActionClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, action: string) => {
        e.preventDefault()
        setActionSelected(action)
        setFormVisible(true)
    }

    const className = 'VerifyActions'
    return (
        <div className={className}>
            <h2 className={`${className}_sectionHeader`}>Verify Options</h2>
            <div className={`${className}_verifyButtonsContainer`}>
                <button className={`${className}_verifyButton`} onClick={e => handleActionClick(e, 'Weight')} style={{ display: pendingVerified.weight.amount !== 0 ? 'none' : 'block'}}>
                    <ScaleSVG className={`${className}_svg ${className}_scale`} data-testid='verifySvg' />
                    <p className={`${className}_verifyButtonText`}>Weight</p>
                </button>
                <button className={`${className}_verifyButton`} onClick={e => handleActionClick(e, 'Bench')} style={{ display: pendingVerified.bench.weight !== 0 ? 'none' : 'block'}}>
                    <BenchSVG className={`${className}_svg`} data-testid='verifySvg' />
                    <p className={`${className}_verifyButtonText`}>Bench</p>
                </button>
                <button className={`${className}_verifyButton`} onClick={e => handleActionClick(e, 'Squat')} style={{ display: pendingVerified.squat.weight !== 0 ? 'none' : 'block'}}>
                    <SquatSVG className={`${className}_svg`} data-testid='verifySvg' />
                    <p className={`${className}_verifyButtonText`}>Squat</p>
                </button>
                <button className={`${className}_verifyButton`} onClick={e => handleActionClick(e, 'Deadlift')} style={{ display: pendingVerified.deadlift.weight !== 0 ? 'none' : 'block'}}>
                    <DeadliftSVG className={`${className}_svg`} data-testid='verifySvg' />
                    <p className={`${className}_verifyButtonText`}>Deadlift</p>
                </button>
            </div>
        </div>
    )
}

export default VerifyActions