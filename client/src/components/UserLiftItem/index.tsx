import React from 'react'
import { ReactComponent as BenchSVG } from '../../assets/benchSVG.svg'
import { ReactComponent as SquatSVG } from '../../assets/squatSVG.svg'
import { ReactComponent as DeadliftSVG } from '../../assets/deadliftSVG.svg'
import './styles.css'

interface Props {
    date: string
    lift: string,
    weight: number,
    reps: number
}

const UserLiftItem: React.FC<Props> = ({ date, lift, weight, reps }) => {

    const handleLiftClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.preventDefault()
    }

    const className = 'UserLiftItem'
    return (
        <div className={className} onClick={handleLiftClick} >
            <p className={`${className}_text`}>{date}</p>
            {{
                'Bench': <BenchSVG className={`${className}_svgIcon`} />,
                'Squat': <SquatSVG className={`${className}_svgIcon`} />,
                'Deadlift': <DeadliftSVG className={`${className}_svgIcon`} />
            }[lift]}
            <p className={`${className}_text`}>{`${weight} x ${reps}`}</p>
        </div>
    )
}

export default UserLiftItem