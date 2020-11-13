import React from 'react'
import { enableMapSet } from "immer"


import { useStore } from './Components/Utils/zustand'

import './App.css';
import Home from './Components/Pages/Home';
import Login from './Components/Pages/Login';

const App = () => {

  enableMapSet()

  const { name, setName } = useStore()
  const addUser = useStore(state => state.addUser)

  const handleSubmit = (name) => {
    addUser(name)
    setName(name)
  }

  return (
    <div className="App">
      {name ? <Home></Home> : <Login submit={(props) => handleSubmit(props)}></Login>}
    </div>
  );
}

export default App;
