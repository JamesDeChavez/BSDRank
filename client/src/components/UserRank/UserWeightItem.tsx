import { useMutation } from '@apollo/client'
import { useState, useContext } from 'react'
import { UserLoggedInContext } from '../../App'
import { ReactComponent as ScaleSVG } from '../../assets/scaleSVG.svg'
import { UPDATE_WEIGHT } from '../../graphql/mutations'
import './styles.css'

interface Props {
    weight: number,
    setWeight: React.Dispatch<React.SetStateAction<number>>,
    isSearch: boolean
}

const UserWeightItem: React.FC<Props> = ({ weight, setWeight, isSearch }) => {
    const { userId } = useContext(UserLoggedInContext)
    const [editWeight] = useMutation(UPDATE_WEIGHT)

    const [editActive, setEditActive] = useState(false)

    const handleEditClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.preventDefault()
        setEditActive(prevState => !prevState)
    }

    const handleSubmit = async (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.preventDefault()
        const newWeight = await editWeight({ variables: {
            userId: userId, weight: weight
        }})
        if (newWeight.data.updateWeight) {
            setEditActive(false)
        }

    }

    const className = 'UserWeightItem'
    return (
        <div className={className}>
            <div className={`${className}_weightContainer`}>
                <ScaleSVG className={`${className}_svgIcon`}/>
                {editActive ?
                    <input type="number" className={`${className}_input`} pattern="[0-9]*" name="weight" id="weight" value={weight.toString()} onChange={e => setWeight(prevState => e.target.validity.valid ? Number(e.target.value) : prevState)} />
                :
                    <p>{`${weight} lbs`}</p>
                }
            </div>
            <div className={`${className}_buttonContainer`} style={{display: isSearch ? 'none' : 'flex'}}>
                <div className={`${className}_button`} onClick={handleSubmit} style={{display: editActive ? 'block' : 'none'}}>Submit</div>
                <div className={`${className}_button`} onClick={handleEditClick}>{ editActive ?'Cancel' : 'Edit Weight' }</div>
            </div>
        </div>
    )
}

export default UserWeightItem