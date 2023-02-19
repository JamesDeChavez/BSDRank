import './styles.css'
import TopLifter from './TopLifter'

const TopLifts = () => {
    const className = 'TopLifts'
    return (
        <div className={className}>
            <div className={`${className}_table`}>
                <h1 className={`${className}_header`}>Top Verified Lifters</h1>
                <TopLifter/>
                <TopLifter/>
                <TopLifter/>
                <TopLifter/>
                <TopLifter/>
            </div>
        </div>
    )
}

export default TopLifts