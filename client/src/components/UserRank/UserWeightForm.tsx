import { useContext } from 'react'
import { UserWeightEditActiveContext } from '../../branches/UserWeight'
import './styles.css'

const UserWeightForm = () => {
    const setEditActive = useContext(UserWeightEditActiveContext)

    const cancelEdit = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.preventDefault()
        setEditActive(prevState => !prevState)
    }

    const className = 'UserWeightForm'
    return (
        <div className={className}>
            <div className={`${className}_form`}>
                <label htmlFor="weight" className={`${className}_label`}>Weight (lbs):</label>
                <input type="number" value='145 lbs' />
            </div>
            <div className={`${className}_buttonsContainer`}>
                <div className={`${className}_button`}>Submit</div>
                <div className={`${className}_button`} onClick={cancelEdit}>Cancel</div>
            </div>
        </div>
    )
}

export default UserWeightForm