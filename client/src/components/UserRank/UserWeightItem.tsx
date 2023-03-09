import { useState } from 'react'
import { ReactComponent as ScaleSVG } from '../../assets/scaleSVG.svg'
import './styles.css'

interface Props {
    weight: number,
    setWeight: React.Dispatch<React.SetStateAction<number>>,
    isSearch: boolean
}

const UserWeightItem: React.FC<Props> = ({ weight, setWeight, isSearch }) => {
    const [editActive, setEditActive] = useState(false)

    const editWeight = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.preventDefault()
        setEditActive(prevState => !prevState)
    }

    const submitWeight = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.preventDefault()
        console.log(weight)
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
                <div className={`${className}_button`} onClick={submitWeight} style={{display: editActive ? 'block' : 'none'}}>Submit</div>
                <div className={`${className}_button`} onClick={editWeight}>{ editActive ?'Cancel' : 'Edit Weight' }</div>
            </div>
        </div>
    )
}

export default UserWeightItem