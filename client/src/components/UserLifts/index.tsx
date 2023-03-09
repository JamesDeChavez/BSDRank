import { useState } from 'react'
import UserLiftItem from '../UserLiftItem'
import './styles.css'

const date = new Date()

const cache = {
    userLifts: [
        { date: date, lift: 'Deadlift', weight: 265, reps: 5 },
        { date: date, lift: 'Squat' , weight: 215, reps: 5 }
    ]
}

const UserLifts = () => {
    const [filter, setFilter] = useState('')

    const handleFilterClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, name: string) => {
        e.preventDefault()
        switch (name) {
            case 'Bench':
                if (filter === 'Bench') setFilter('')
                else setFilter('Bench')
                break
            case 'Squat':
                if (filter === 'Squat') setFilter('')
                else setFilter('Squat')
                break
            case 'Deadlift':
                if (filter === 'Deadlift') setFilter('')
                else setFilter('Deadlift')
                break
            default: break
        }
    }

    const className = 'UserLifts'
    return (
        <div className={className}>
            <h1 className={`${className}_header`}>Your Recent Lifts</h1>
            <div className={`${className}_filterContainer`}>
                <p>Filter:</p>
                <button className={`${className}_filter`} onClick={e => handleFilterClick(e, 'Bench')}>Bench</button>
                <button className={`${className}_filter`} onClick={e => handleFilterClick(e, 'Squat')}>Squat</button>
                <button className={`${className}_filter`} onClick={e => handleFilterClick(e, 'Deadlift')}>Deadlift</button>
            </div>
            <div className={`${className}_liftsContainer`}>
                {cache.userLifts.filter((lift) => {
                    if (filter === '') return lift
                    else return lift.lift === filter
                }).map((lift, i) => {
                    return <UserLiftItem key={i} date={lift.date} lift={lift.lift} weight={lift.weight} reps={lift.reps} />
                })}
            </div>
        </div>
    )
}

export default UserLifts