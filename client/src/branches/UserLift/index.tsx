import React, { useState } from 'react'
import UserLiftForm from '../../components/UserLifts/UserLiftForm'
import UserLiftItem from '../../components/UserLifts/UserLiftItem'

export const UserLiftActiveContext = React.createContext<React.Dispatch<React.SetStateAction<boolean>>>(() => {})

const UserLiftBranch = () => {
    const [editActive, setEditActive] = useState(false)
    return (
        <UserLiftActiveContext.Provider value={setEditActive}>
            <UserLiftItem/>
            <UserLiftForm visible={editActive} />
        </UserLiftActiveContext.Provider>
    )
}

export default UserLiftBranch