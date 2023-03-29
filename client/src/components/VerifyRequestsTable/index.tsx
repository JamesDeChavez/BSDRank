import { useEffect, useState } from 'react'
import { useLazyQuery, useMutation, useQuery } from '@apollo/client'
import { GET_LEADERBOARD, GET_USER, GET_VERIFY_REQUESTS } from '../../graphql/query'
import classNames from 'classnames'
import { UPDATE_LEADERBOARD, UPDATE_USER_FOR_VERIFY_REQUEST, UPDATE_VERIFY_REQUEST } from '../../graphql/mutations'
import './styles.css'
import { calculateWilksScore, checkIfNewLeaderboard } from '../../utils/functions'

const VerifyRequestsTable = () => {
    const { data } = useQuery(GET_VERIFY_REQUESTS)
    const leaderboardRequest = useQuery(GET_LEADERBOARD)
    const [getUser] = useLazyQuery(GET_USER)
    const [updateVerifyRequest] = useMutation(UPDATE_VERIFY_REQUEST)
    const [updateUserForVerifyRequest] = useMutation(UPDATE_USER_FOR_VERIFY_REQUEST)
    const [updateLeaderboard] = useMutation(UPDATE_LEADERBOARD)

    const [selectedRequest, setSelectedRequest] = useState<any>()
    const [selectedPendingVerified, setSelectedPendingVerified] = useState<any>()
    const [selectedVerified, setSelectedVerified] = useState<any>()
    const [selectedUsername, setSelectedUsername] = useState()
    const [selectedSex, setSelectedSex] = useState('')

    const handleRequestClick = async (e: React.MouseEvent<HTMLDivElement, MouseEvent>, request: any) => {
        setSelectedRequest(request)
        const userData = await getUser({ variables: { userId: request.userId }})
        const { username, pendingVerified, verified, sex } = userData.data.user
        setSelectedPendingVerified(pendingVerified)
        setSelectedVerified(verified)
        setSelectedUsername(username)
        setSelectedSex(sex)
    }

    const handleAcceptClick = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        if (!selectedRequest) return

        const newPendingVerified: any = {
            weight: {
                amount: selectedPendingVerified.weight.amount,
                videoURL: selectedPendingVerified.weight.videoURL
            },
            bench: {
                weight: selectedPendingVerified.bench.weight,
                reps: selectedPendingVerified.bench.reps,
                videoURL: selectedPendingVerified.bench.videoURL
            },
            squat: {
                weight: selectedPendingVerified.squat.weight,
                reps: selectedPendingVerified.squat.reps,
                videoURL: selectedPendingVerified.squat.videoURL
            },
            deadlift: {
                weight: selectedPendingVerified.deadlift.weight,
                reps: selectedPendingVerified.deadlift.reps,
                videoURL: selectedPendingVerified.deadlift.videoURL
            }
        }
        if (selectedRequest.lift === 'Weight') {
            newPendingVerified['weight'] = { amount: 0, videoURL: "" }
        } else {
            newPendingVerified[selectedRequest.lift.toLowerCase()] = {
                weight: 0,
                reps: 0,
                videoURL: ""
            }
        }
        
        const newVerified: any = {
            weight: {
                amount: selectedVerified.weight.amount,
                videoURL: selectedVerified.weight.videoURL
            },
            bench: {
                weight: selectedVerified.bench.weight,
                reps: selectedVerified.bench.reps,
                videoURL: selectedVerified.bench.videoURL
            },
            squat: {
                weight: selectedVerified.squat.weight,
                reps: selectedVerified.squat.reps,
                videoURL: selectedVerified.squat.videoURL
            },
            deadlift: {
                weight: selectedVerified.deadlift.weight,
                reps: selectedVerified.deadlift.reps,
                videoURL: selectedVerified.deadlift.videoURL
            }
        }
        if (selectedRequest.lift === 'Weight') {
            newVerified['weight'] = { amount: selectedRequest.weight, videoURL: selectedRequest.videoURL }
        } else {
            newVerified[selectedRequest.lift.toLowerCase()] = {
                weight: selectedRequest.weight,
                reps: selectedRequest.reps,
                videoURL: selectedRequest.videoURL
            }
        }

        const fullyVerifiedCheck = newVerified.weight.amount > 0 && newVerified.bench.weight > 0 && newVerified.squat.weight > 0 && newVerified.deadlift.weight > 0
        let newLeaderboard = leaderboardRequest.data.leaderboard.leaderboard.map((leader: any) => {
            return {
                userId: leader.userId,
                wilksScore: leader.wilksScore
            }
        })
        if (fullyVerifiedCheck && leaderboardRequest) {
            const oldLeaderboard = leaderboardRequest.data.leaderboard.leaderboard.map((leader: any) => {
                return {
                    userId: leader.userId,
                    wilksScore: leader.wilksScore
                }
            })
            const newUserWilksScore = calculateWilksScore({
                weight: newVerified.weight.amount,
                benchWeight: newVerified.bench.weight,
                benchReps: newVerified.bench.reps,
                squatWeight: newVerified.squat.weight,
                squatReps: newVerified.squat.reps,
                deadliftWeight: newVerified.deadlift.weight,
                deadliftReps: newVerified.deadlift.reps,
                sex: selectedSex
            })
            newLeaderboard = checkIfNewLeaderboard(oldLeaderboard, { userId: selectedRequest.userId, wilksScore: Math.floor(newUserWilksScore) })
        }

        try {     
            await updateVerifyRequest({ variables: { 
                updateVerifyRequestId: selectedRequest._id, 
                status: "ACCEPTED" 
            }})
            await updateUserForVerifyRequest({ variables: {
                updateUserForVerifyRequestId: selectedRequest.userId,
                verified: newVerified,
                pendingVerified: newPendingVerified
            }})
            if (newLeaderboard) await updateLeaderboard({ variables: {
                updateLeaderboardId: leaderboardRequest.data.leaderboard._id,
                leaderboard: { leaderboard: newLeaderboard }
            }})        
        } catch (error) {
            console.log(error)
        }
        

    }

    const handleRejectClick = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        if (!selectedRequest) return

        const newPendingVerified: any = {
            weight: {
                amount: selectedPendingVerified.weight.amount,
                videoURL: selectedPendingVerified.weight.videoURL
            },
            bench: {
                weight: selectedPendingVerified.bench.weight,
                reps: selectedPendingVerified.bench.reps,
                videoURL: selectedPendingVerified.bench.videoURL
            },
            squat: {
                weight: selectedPendingVerified.squat.weight,
                reps: selectedPendingVerified.squat.reps,
                videoURL: selectedPendingVerified.squat.videoURL
            },
            deadlift: {
                weight: selectedPendingVerified.deadlift.weight,
                reps: selectedPendingVerified.deadlift.reps,
                videoURL: selectedPendingVerified.deadlift.videoURL
            }
        }
        if (selectedRequest.lift === 'Weight') {
            newPendingVerified['weight'] = { amount: 0, videoURL: "" }
        } else {
            newPendingVerified[selectedRequest.lift.toLowerCase()] = {
                weight: 0,
                reps: 0,
                videoURL: ""
            }
        }

        const newVerified: any = {
            weight: {
                amount: selectedVerified.weight.amount,
                videoURL: selectedVerified.weight.videoURL
            },
            bench: {
                weight: selectedVerified.bench.weight,
                reps: selectedVerified.bench.reps,
                videoURL: selectedVerified.bench.videoURL
            },
            squat: {
                weight: selectedVerified.squat.weight,
                reps: selectedVerified.squat.reps,
                videoURL: selectedVerified.squat.videoURL
            },
            deadlift: {
                weight: selectedVerified.deadlift.weight,
                reps: selectedVerified.deadlift.reps,
                videoURL: selectedVerified.deadlift.videoURL
            }
        }

        try {
            await updateVerifyRequest({ variables: { updateVerifyRequestId: selectedRequest._id, status: "REJECTED" }})
            await updateUserForVerifyRequest({ variables: {
                updateUserForVerifyRequestId: selectedRequest.userId,
                verified: newVerified,
                pendingVerified: newPendingVerified
            }})
        } catch (error) {
            console.log(error)
        }


    }

    const className = 'VerifyRequestsTable'
    return (
        <div className={className}>
            <h2 className={`${className}_header`}>Verification Requests</h2>
            <div className={`${className}_buttonsContainer`}>
                <button className={`${className}_button`} onClick={handleAcceptClick}>Accept</button>
                <button className={`${className}_button`} onClick={handleRejectClick}>Reject</button>
            </div>
            <div>
                <h3>Selected User Data:</h3>
                <div className={`${className}_flexRow`}>
                    <p>{`Username: ${selectedUsername}`}</p>
                </div>
                <div className={`${className}_flexRow`}>
                    {selectedRequest && selectedVerified ?
                    <>
                        <p>{`Current Best:`}</p>
                        {selectedRequest.lift === 'Weight' ?
                            <p>{`${selectedVerified.weight.amount}`}</p>
                        :
                            <p>{`${selectedVerified[selectedRequest.lift.toLowerCase()].weight} x ${selectedVerified[selectedRequest.lift.toLowerCase()].reps}`}</p>
                        }
                    </>
                    :
                        <></>
                    }
                </div>
            </div>
            {data && data.verifyRequests.filter((request: any) => request.status === "PENDING").map((request: any, i: number) => {
                return ( 
                    <div key={i} className={classNames(
                        `${className}_request`,
                        {[`${className}_selected`]: selectedRequest && selectedRequest._id === request._id}         
                    )} onClick={e => handleRequestClick(e, request)} >
                        <p>{`UserID: ${request.userId}`}</p>
                        <div className={`${className}_textContainer`}>
                            <p>{request.lift}</p>
                            <div className={`${className}_numberContainer`}>
                                {request.lift === 'Weight' ?
                                    <p>{request.weight}</p>
                                :
                                    <p>{`${request.weight} x ${request.reps}`}</p>
                                }
                            </div>
                            <a href={request.videoURL} target="_blank" rel='noreferrer'>Verify Link</a>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default VerifyRequestsTable