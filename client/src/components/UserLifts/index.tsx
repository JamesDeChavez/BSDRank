import classNames from 'classnames'
import { useContext, useState } from 'react'
import { UserLoggedInContext } from '../../App'
import { UserLiftsFragment } from '../../graphql/fragments'
import { client } from '../../index'
import { LiftSubmission } from '../../utils/interfaces'
import UserLiftItem from '../UserLiftItem'
import './styles.css'

const UserLifts = () => {
    const { userId } = useContext(UserLoggedInContext)
    const userLifts: { lifts: LiftSubmission[] } | null = client.readFragment({
        id: `User:${userId}`,
        fragment: UserLiftsFragment
    })
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
            <h2 className={`${className}_header`}>Your Recent Lifts</h2>
            <div className={`${className}_filterContainer`}>
                <p>Filter:</p>
                <button className={classNames(
                    `${className}_filter`,
                    {[`${className}_active`]: filter === 'Bench'}
                )} onClick={e => handleFilterClick(e, 'Bench')}>Bench</button>
                <button className={classNames(
                    `${className}_filter`,
                    {[`${className}_active`]: filter === 'Squat'}
                )} onClick={e => handleFilterClick(e, 'Squat')}>Squat</button>
                <button className={classNames(
                    `${className}_filter`,
                    {[`${className}_active`]: filter === 'Deadlift'}
                )} onClick={e => handleFilterClick(e, 'Deadlift')}>Deadlift</button>
            </div>
            <div className={`${className}_liftsContainer`}>
                {userLifts && userLifts.lifts.filter((lift) => {
                    if (filter === '') return lift
                    else return lift.lift === filter
                }).length ?
                    userLifts.lifts.filter((lift) => {
                        if (filter === '') return lift
                        else return lift.lift === filter
                    }).slice(0, 15).map((lift, i) => {
                        return <UserLiftItem key={i} date={lift.date} lift={lift.lift} weight={lift.weight} reps={lift.reps} />
                    })
                :
                    <p style={{gridColumn: '1/4', justifySelf: 'flex-start'}}>Your workouts will apear here</p>
                }
            </div>
        </div>
    )
}

export default UserLifts