import LifterItem from '../LifterItem'
import './styles.css'

const CommunityTable = () => {
    const className = 'CommunityTable'
    return (
        <div className={className}>
            <h2 className={`${className}_header`}>BSD Users</h2>
            <div className={`${className}_table`}>
                {Array(10).fill('').map(user => {
                    return <LifterItem/>
                })}
            </div>
        </div>
    )
}

export default CommunityTable