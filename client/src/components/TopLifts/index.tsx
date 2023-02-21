import './styles.css'
import LifterItem from '../LifterItem'

const TopLifts = () => {
    const className = 'TopLifts'
    return (
        <div className={className}>
            <div className={`${className}_table`}>
                <h1 className={`${className}_header`}>Top Verified Lifters</h1>
                <LifterItem/>
                <LifterItem/>
                <LifterItem/>
                <LifterItem/>
                <LifterItem/>
            </div>
        </div>
    )
}

export default TopLifts