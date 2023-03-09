import './styles.css'

interface Props {
    setWeightEditActive: React.Dispatch<React.SetStateAction<boolean>>
}

const UserWeightForm: React.FC<Props> = ({ setWeightEditActive }) => {

    const cancelEdit = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.preventDefault()
        setWeightEditActive(prevState => !prevState)
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