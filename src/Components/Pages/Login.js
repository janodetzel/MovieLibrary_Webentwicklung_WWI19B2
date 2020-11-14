import React from "react";
import { useState } from "react";
import { FiNavigation } from "react-icons/fi";
import { useStore } from '../Utils/zustand'


import style from "./Login.module.css";

const Login = (props) => {

    const defaultInput = "What's your name?";
    const [input, setInput] = useState("")

    const users = useStore(state => (state.users))
    console.log(users)

    const handleSubmit = (event) => {
        if (input) {
            props.logIn(input)
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
            <div className={style.recentUsers}>
                <p>Recents</p>

                <div className={style.wrapper}>
                    {users.slice(0, 9).map((user, key) => (
                        <a key={key} href="#" className={style.recentUser} onClick={() => props.logIn(user.name)
                        }>{user.name}</a>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Login;
