import React from "react";
import { FiMinusCircle } from "react-icons/fi";

import style from "./DeleteButton.module.css";

const DeleteButton = (props) => {
    return (
        <button className={style.button} onClick={props.onClick}>
            <FiMinusCircle className={style.icon}></FiMinusCircle>
        </button>
    );
};

export default DeleteButton;
