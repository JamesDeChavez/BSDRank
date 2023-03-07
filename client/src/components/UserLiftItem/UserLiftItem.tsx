import './styles.css'

const UserLiftItem = () => {
    const date = '3/6'
    const weight = 225

    const handleLiftClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.preventDefault()
    }

    const className = 'UserLiftItem'
    return (
        <div className={className} onClick={handleLiftClick} >
            <p className={`${className}_date`}>{date}</p>
            <div>[    ]</div>
            <p className={`${className}_weight`}>{weight}</p>
        </div>
    )
}

export default UserLiftItem