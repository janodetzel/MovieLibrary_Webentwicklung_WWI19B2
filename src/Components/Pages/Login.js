import React from "react";
import { useState } from "react";
import { FiNavigation } from "react-icons/fi";


import { Modal, InputGroup, FormControl, Button } from "react-bootstrap"
import style from "./Login.module.css";

const Login = (props) => {

    const defaultInput = "What's your name?";
    const [input, setInput] = useState("")

    const handleSubmit = (event) => {
        if (input) {
            props.submit(input)
            reset()
        } else {
        }
        event.preventDefault();
    }


    const reset = () => {
        setInput("")
    }

    return (
        <div className={style.login}>
            <form onSubmit={e => handleSubmit(e)}>
                <input type="text" placeholder={defaultInput} value={input} onChange={(e) => setInput(e.target.value)} />
                <button type="submit" className={style.button}><FiNavigation className={style.icon}></FiNavigation></button>
            </form>
        </div>
    );
};

export default Login;
