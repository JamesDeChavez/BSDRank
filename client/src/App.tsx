import { useState } from 'react';
import AuthBranch from './branches/Auth';
import NonAuthBranch from './branches/NonAuth';
import './App.css';

function App() {
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  return (
    <div className="App">
      {!userLoggedIn ?
        <NonAuthBranch/>
      :
        <AuthBranch/>
      }
    </div>
  );
}

export default App;
