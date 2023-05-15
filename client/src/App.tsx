import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client'
import AuthBranch from './branches/Auth';
import { GET_RETURNING_USER } from './graphql/query';
import LandingPage from './pages/Landing';
import './App.css';

export const UserLoggedInContext = React.createContext<{
  userLoggedIn: boolean, setUserLoggedIn: React.Dispatch<React.SetStateAction<boolean>>,
  userId: string, setUserId: React.Dispatch<React.SetStateAction<string>>
}>({
  userLoggedIn: false, setUserLoggedIn: () => {},
  userId: '', setUserId: () => {}
})

function App() {
  const [userLoggedIn, setUserLoggedIn] = useState(false)
  const [userId, setUserId] = useState('')
  const { data } = useQuery(GET_RETURNING_USER)

  useEffect(() => {
    if (data && data.returningUser) {
      setUserId(data.returningUser._id)
      setUserLoggedIn(true)
    }
  }, [data])

  return (
    <div className="App">
      <UserLoggedInContext.Provider value={{userLoggedIn, setUserLoggedIn, userId, setUserId}}>
      {!userLoggedIn ?
        <LandingPage/>
      :
        <AuthBranch/>
      }
      </UserLoggedInContext.Provider>
    </div>
  )
}

export default App
