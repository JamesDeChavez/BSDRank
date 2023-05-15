import React, { useState, useContext } from 'react'
import { ReactComponent as BenchSVG } from '../../assets/benchSVG.svg'
import { ReactComponent as SquatSVG } from '../../assets/squatSVG.svg'
import { ReactComponent as DeadliftSVG } from '../../assets/deadliftSVG.svg'
import { UserLoggedInContext } from '../../App'
import { BestLiftsFragment, UserLiftsFragment } from '../../graphql/fragments'
import { client } from '../../index'
import { useMutation } from '@apollo/client'
import { DELETE_LIFT } from '../../graphql/mutations'
import { LiftSubmission } from '../../utils/interfaces'
import { findNewBest } from '../../utils/functions'
import './styles.css'
import Loading from '../Loading'

interface Props {
    date: string
    lift: string,
    weight: number,
    reps: number
}

const UserLiftItem: React.FC<Props> = ({ date, lift, weight, reps }) => {
    const { userId } = useContext(UserLoggedInContext)
    const userLifts = client.readFragment({ id: `User:${userId}`, fragment: UserLiftsFragment })
    const bestLifts = client.readFragment({ id: `User:${userId}`, fragment: BestLiftsFragment })
    const [deleteLift, {loading}] = useMutation(DELETE_LIFT)
    const [overlayVisible, setOverlayVisible] = useState(false)

    const handleLiftClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.preventDefault()
        if (overlayVisible) return
        setOverlayVisible(prevState => !prevState)
    }

    const handleDeleteClick = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()

        //Update Lifts
        const updatedLifts: LiftSubmission[] = userLifts.lifts.map((lift: any) => {
            return {
                date: lift.date,
                lift: lift.lift,
                weight: lift.weight,
                reps: lift.reps
            }
        })

        const indexToRemove = updatedLifts.findIndex(lft => 
            lft.date === date && lft.lift === lift && lft.weight === weight && lft.reps === reps
        )
        updatedLifts.splice(indexToRemove, 1)

        //Update Best Lifts
        let newBestLifts = {
            bench: {
                weight: bestLifts.bestLifts.bench.weight,
                reps: bestLifts.bestLifts.bench.reps
            } ,
            squat: {
                weight: bestLifts.bestLifts.squat.weight,
                reps: bestLifts.bestLifts.squat.reps
            } ,
            deadlift: {
                weight: bestLifts.bestLifts.deadlift.weight,
                reps: bestLifts.bestLifts.deadlift.reps
            } ,
        }
        
        const liftName = lift.toLowerCase()
        const currentBestWeight = bestLifts.bestLifts[liftName].weight
        const currentBestReps = bestLifts.bestLifts[liftName].reps

        if (currentBestWeight === weight && currentBestReps === reps) {
            const newBest = findNewBest(updatedLifts, lift)
            newBestLifts = { 
                ...newBestLifts, 
                [liftName]: { 
                    weight: newBest.weight, 
                    reps: newBest.reps
                } 
            }
        }

        //Send Mutation to server
        try {
            const newLifts = await deleteLift({ variables: {
                userId: userId, lifts: updatedLifts, bestLifts: newBestLifts
            }})
            if (newLifts) setOverlayVisible(false)
        } catch (error) {
            console.log(error)
        }

    }
    
    const handleCancelClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        setOverlayVisible(prevState => !prevState)
    }

    const className = 'UserLiftItem'
    return (
        <div className={className} onClick={handleLiftClick} >
            <div className={`${className}_overlayContainer`} style={{display: overlayVisible ? 'flex' : 'none'}}>
                <button className={`${className}_button`} onClick={handleDeleteClick} style={{display: loading ? 'none' : 'block'}}>Delete</button>
                <Loading loading={loading} />
                <button className={`${className}_button`} onClick={handleCancelClick}>Cancel</button>
            </div>
            <p className={`${className}_text`}>{date}</p>
            {{
                'Bench': <BenchSVG className={`${className}_svgIcon`} data-testid={'svgTestId'} />,
                'Squat': <SquatSVG className={`${className}_svgIcon`} data-testid={'svgTestId'} />,
                'Deadlift': <DeadliftSVG className={`${className}_svgIcon`} data-testid={'svgTestId'} />
            }[lift]}
            <p className={`${className}_text`}>{`${weight} x ${reps}`}</p>
        </div>
    )
}

export default UserLiftItem