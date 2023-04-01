import { useMutation } from '@apollo/client'
import { useState, useContext } from 'react'
import { UserLoggedInContext } from '../../App'
import { UPDATE_WEIGHT } from '../../graphql/mutations'
import './styles.css'
import Loading from '../Loading'

interface Props {
    weight: number,
    setWeight: React.Dispatch<React.SetStateAction<number>>,
    isSearch: boolean,
    verified: string
}

const UserWeightItem: React.FC<Props> = ({ weight, setWeight, isSearch, verified }) => {
    const { userId } = useContext(UserLoggedInContext)
    const [editWeight, {loading}] = useMutation(UPDATE_WEIGHT)
    const [editActive, setEditActive] = useState(false)

    const handleWeightClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
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
                {isSearch || verified === 'Verified' ?
                    <p>Weight: </p>
                :
                    <button className={`${className}_weightDropDown`} onClick={handleWeightClick}>
                        <span>Weight:</span>
                        <svg className={`${className}_scrollTriangle`} viewBox="0 0 100 50">
                            <polygon points='5,5 95,5 45,50'/>
                        </svg>
                    </button>
                }
                {editActive ?
                    <input 
                        type="number" 
                        className={`${className}_input`} 
                        pattern="[0-9]*" 
                        name="weight" id="weight" 
                        value={weight.toString()} 
                        autoComplete="off"
                        onChange={e => setWeight(prevState => e.target.validity.valid ? Number(e.target.value) : prevState)} 
                    />
                :
                    <p>{`${weight} lbs`}</p>
                }
            </div>
            <div className={`${className}_buttonContainer`} style={{display: !editActive ? 'none' : 'flex'}}>
                <div className={`${className}_button`} onClick={handleSubmit} style={{display: editActive && !loading ? 'block' : 'none'}}>Submit</div>
                <Loading loading={loading} />
            </div>
        </div>
    )
}

export default UserWeightItem