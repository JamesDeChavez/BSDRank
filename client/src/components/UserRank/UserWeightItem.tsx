import { useContext } from 'react'
import { UserWeightEditActiveContext } from '../../branches/UserWeight'
import './styles.css'

const UserWeightItem = () => {
    const setEditActive = useContext(UserWeightEditActiveContext)

    const editWeight = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.preventDefault()
        setEditActive(prevState => !prevState)
    }

    const className = 'UserWeightItem'
    return (
        <div className={className}>
            <div className={`${className}_weightContainer`}>
                <span>Weight (lbs):</span>
                <span>145 lbs</span>
            </div>
            <div className={`${className}_buttonContainer`}>
                <div className={`${className}_button`} onClick={editWeight}>Edit Weight</div>
            </div>
        </div>
    )
}

export default UserWeightItem