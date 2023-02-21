import React, { useState } from 'react'
import UserWeightForm from '../../components/UserRank/UserWeightForm'
import UserWeightItem from '../../components/UserRank/UserWeightItem'

export const UserWeightEditActiveContext = React.createContext<React.Dispatch<React.SetStateAction<boolean>>>(() => {})

const UserWeightBranch = () => {
    const [editActive, setEditActive] = useState(false)
    return (
        <UserWeightEditActiveContext.Provider value={setEditActive}>
        {editActive ?
            <UserWeightForm/>
        :
            <UserWeightItem/>
        }
        </UserWeightEditActiveContext.Provider>
    )
}

export default UserWeightBranch