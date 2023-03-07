import LifterItem from '../LifterItem'
import './styles.css'

const FollowedLifters = () => {
    const className = 'FollowedLifters'
    return (
        <div className={className}>
            <h1 className={`${className}_header`}>Lifters You Follow</h1>
            {Array(5).fill('').map(user => {
                return <LifterItem/>
            })}
        </div>
    )
}

export default FollowedLifters