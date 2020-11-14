import React, { useState, useEffect } from 'react'
import style from './CardList.module.css'
import ScrollContainer from "react-indiana-drag-scroll";
import Card from '../../Molekules/Card/Card';
import FindMovieModal from '../Modal/FindMovieModal';
import DeleteButton from '../../Atoms/Button/DeleteButton';
import uuid from 'react-uuid'

import { useStore } from '../../Utils/zustand'
import shallow from 'zustand/shallow'


const CardList = (props) => {

    const [modalState, setModalState] = useState(false);

    const toggleModal = () => {
        setModalState(!modalState)
    }

    const { cards, addCard_v2, deleteCard_v2 } = useStore(state => ({ cards: state.getCards_v2(props.title, props.user), addCard_v2: state.addCard_v2, deleteCard_v2: state.deleteCard_v2 }), shallow)

    const handleAddCard = movieId => {
        addCard_v2(movieId, props.title, props.user)
    }

    const handleDeleteCard = movieId => {
        deleteCard_v2(movieId, props.title, props.user)
    }

    return (
        <div className={style.cardList}>
            <div className={style.header}>
                <h1>{props.title}</h1>
                <div className={style.deleteButton} onClick={() => props.deleteList(props.title)}>
                    <DeleteButton type="list"></DeleteButton>
                </div>
            </div>
            <ScrollContainer className={style.cardListcontainer}>
                {cards.map(card => { return <Card key={uuid()} new={false} movieId={card} deleteCard={() => handleDeleteCard(card)} ></Card> })}
                <Card new={true} onClick={toggleModal}></Card>
            </ScrollContainer>
            <FindMovieModal show={modalState} hide={toggleModal} submit={(props) => handleAddCard(props)}></FindMovieModal>
        </div>
    )
}


export default CardList
