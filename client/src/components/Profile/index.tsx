import { useMutation, useQuery } from '@apollo/client'
import { useContext, useState } from 'react'
import { client } from '../../index'
import { UserLoggedInContext } from '../../App'
import { UserProfile } from '../../graphql/fragments'
import { DELETE_USER, UPDATE_LEADERBOARD } from '../../graphql/mutations'
import { GET_LEADERBOARD } from '../../graphql/query'
import { ReactComponent as PlusSvg } from '../../assets/plus-solid.svg'
import { ReactComponent as MinusSvg } from '../../assets/minus-solid.svg'
import './styles.css'

const Profile = () => {
    const { userId, setUserLoggedIn } = useContext(UserLoggedInContext)
    const userProfile = client.readFragment({ id: `User:${userId}`, fragment: UserProfile})
    const leaderboardRequest = useQuery(GET_LEADERBOARD)
    const [deleteUser] = useMutation(DELETE_USER)
    const [updateLeaderboard] = useMutation(UPDATE_LEADERBOARD)
    const [profileVisible, setProfileVisible] = useState(false)
    const [verifyVisible, setVerifyVisible] = useState(false)

    const handleDeleteClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        setVerifyVisible(prevState => !prevState)
    }

    const handleConfirmDeleteClick = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()

        let newLeaderboard = null

        leaderboardRequest.data.leaderboard.leaderboard.forEach((leader: any) => {
            if (leader.userId === userId) {
                newLeaderboard = leaderboardRequest.data.leaderboard.leaderboard.map((leader: any) => {
                    return {
                        userId: leader.userId,
                        wilksScore: leader.wilksScore
                    }
                }).filter((ldr: any) => ldr.userId !== userId)
            }
        })

        try {
            const deletedUser = await deleteUser({variables: { userId }})
            if (newLeaderboard && deletedUser) {
                await updateLeaderboard({ variables: {
                    updateLeaderboardId: leaderboardRequest.data.leaderboard._id,
                    leaderboard: { leaderboard: newLeaderboard }
                }})
            }
            if (deletedUser) {                
                client.clearStore()
                localStorage.clear()
                setUserLoggedIn(false)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const className = 'Profile'
    return (
        <div className={className}>
            <div className={`${className}_container`}>
                <div className={`${className}_headerContainer`} onClick={e => setProfileVisible(prevState => !prevState)}>
                    <h3 className={`${className}_header`}>Your Profile</h3>
                    {profileVisible ?
                        <MinusSvg className={`${className}_headerSvg`} />
                    :
                        <PlusSvg className={`${className}_headerSvg`} />
                    }
                </div>
                <div className={`${className}_profileContainer`} style={{ display: profileVisible ? 'grid' : 'none' }}>
                    <div className={`${className}_rowContainer`}>
                        <p className={`${className}_text`}>Username:</p>
                        <p className={`${className}_text`}>{userProfile.username}</p>
                    </div>
                    <div className={`${className}_rowContainer`}>
                        <p className={`${className}_text`}>Email:</p>
                        <p className={`${className}_text`}>{userProfile.email}</p>
                    </div>
                    <div className={`${className}_buttonsContainer`}>
                        {!verifyVisible ?
                            <button className={`${className}_button`} onClick={handleDeleteClick}>Delete Account</button>
                        :<>
                            <button className={`${className}_button ${className}_confirm`} onClick={handleConfirmDeleteClick}>Confirm Delete</button>
                            <button className={`${className}_button`} onClick={handleDeleteClick}>Cancel</button>
                        </>}
                    </div>
                    <p className={`${className}_text`} style={{display: verifyVisible ? 'block' : 'none', textAlign: 'center'}}>Are you sure?</p>
                </div>
            </div>
        </div>
    )
}

export default Profile 