import React from 'react'
import { useStore } from './Components/Utils/zustand'

import './App.css';
import Home from './Components/Pages/Home';
import Login from './Components/Pages/Login';

const App = () => {


  const { name, setName } = useStore()


  return (
    <div className="App">
      {name ? <Home name={name}></Home> : <Login submit={(props) => setName(props)}></Login>}
    </div>
  );
}

export default App;
