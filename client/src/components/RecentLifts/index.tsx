import RecentLifter from './RecentLifter'
import './styles.css'

const RecentLifts = () => {
    const className = 'RecentLifts'
    return (
        <div className={className}>
            <div className={`${className}_table`}>
                <h1 className={`${className}_header`}>Recent Community Lifts </h1>
                <RecentLifter/>
                <RecentLifter/>
                <RecentLifter/>
                <RecentLifter/>
                <RecentLifter/>
            </div>
        </div>
    )
}

export default RecentLifts