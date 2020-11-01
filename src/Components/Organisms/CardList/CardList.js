import React, { useState, useEffect } from 'react'
import style from './CardList.module.css'
import ScrollContainer from "react-indiana-drag-scroll";
import Card from '../../Molekules/Card/Card';

const CardList = (props) => {

    const [cards, setCards] = useState([550])

    const addCard = (props) => {
        console.log("hi")
    }

    return (
        <div className={style.cardList}>
            <h1>{props.title}</h1>
            <ScrollContainer className={style.cardListcontainer}>
                {cards.map((card, key) => { <Card key={key} new={false} movieId={card} onClick={addCard}></Card> })}
                <Card new={true} onClick={addCard}></Card>
            </ScrollContainer>
        </div>
    )
}


export default CardList
