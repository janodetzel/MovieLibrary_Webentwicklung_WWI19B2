import React, { useState, useEffect } from 'react'
import style from './CardList.module.css'
import ScrollContainer from "react-indiana-drag-scroll";
import Card from '../../Molekules/Card/Card';
import FindMovieModal from '../Modal/FindMovieModal';

const CardList = (props) => {

    const [modalState, setModalState] = useState(false);

    const toggleModal = () => {
        setModalState(!modalState)
    }

    const [cards, setCards] = useState([])

    const addCard = (props) => {
        setCards([...cards, props])
    }

    return (
        <div className={style.cardList}>
            <h1>{props.title}</h1>
            <ScrollContainer className={style.cardListcontainer}>
                {cards.map((card, key) => { return <Card key={key} new={false} movieId={card} onClick={addCard}></Card> })}
                <Card new={true} onClick={toggleModal}></Card>
            </ScrollContainer>
            <FindMovieModal show={modalState} hide={toggleModal} submit={(props) => addCard(props)}></FindMovieModal>
        </div>
    )
}


export default CardList
