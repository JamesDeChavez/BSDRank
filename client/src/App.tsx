import React, { useState } from 'react';
import AuthBranch from './branches/Auth';
import NonAuthBranch from './branches/NonAuth';
import './App.css';


export const UserLoggedInContext = React.createContext<[boolean, React.Dispatch<React.SetStateAction<boolean>>]>([false, () => {}])

function App() {
  const [userLoggedIn, setUserLoggedIn] = useState(false)

  return (
    <div className="App">
      <UserLoggedInContext.Provider value={[userLoggedIn, setUserLoggedIn]}>
      {!userLoggedIn ?
        <NonAuthBranch/>
      :
        <AuthBranch/>
      }
      </UserLoggedInContext.Provider>
    </div>
  )
}

export default App
