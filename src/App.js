import React from 'react'

import { useStore, useSession } from './Components/Utils/zustand'

import './App.css';
import Home from './Components/Pages/Home';
import Login from './Components/Pages/Login';

const App = () => {
  const { user, logIn, logOut } = useSession(state => ({ user: state.user, logIn: state.logIn, logOut: state.logOut }))
  const addUser = useStore(state => state.addUser)

  const handleLogin = (name) => {
    logIn(name)
    addUser(name)
  }

  const handleLogOut = () => {
    logOut()
  }

  return (
    <div className="App">
      {user ? <Home user={user} logOut={() => handleLogOut()}></Home> : <Login logIn={(props) => handleLogin(props)}></Login>}
    </div>
  );
}

export default App;
