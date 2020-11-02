import React, { useState } from 'react'

import './App.css';
import Home from './Components/Pages/Home';
import Login from './Components/Pages/Login';

const App = () => {

  const [state, setState] = useState({ name: "" })

  return (
    <div className="App">
      {state.name ? <Home name={state.name}></Home> : <Login submit={(props) => setState({ name: props })}></Login>}
    </div>
  );
}

export default App;
