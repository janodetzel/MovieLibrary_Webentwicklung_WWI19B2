import React, { useState, useEffect } from 'react'
import style from './CardList.module.css'
import ScrollContainer from "react-indiana-drag-scroll";
import Card from '../../Molekules/Card/Card';
import FindMovieModal from '../Modal/FindMovieModal';
import DeleteButton from '../../Atoms/Button/DeleteButton';

import { useStore } from '../../Utils/zustand'
import shallow from 'zustand/shallow'


const CardList = (props) => {

    const [modalState, setModalState] = useState(false);

    const toggleModal = () => {
        setModalState(!modalState)
    }

    // const [cards, setCards] = useState([]);

    const currentStore = useStore(state => state)
    const { currentList, addCard, deleteCard } = useStore(state => ({ currentList: state.cardLists[props.index], addCard: state.addCard, deleteCard: state.deleteCard }))

    console.log("CURRENTLIST", currentList)
    console.log("CURRENTSTORE", currentStore)

    return (
        <div className={style.cardList}>
            <div className={style.header}>
                <h1>{props.title}</h1>
                <div className={style.deleteButton} onClick={() => props.deleteList(props.title)}>
                    <DeleteButton type="list"></DeleteButton>
                </div>
            </div>
            <ScrollContainer className={style.cardListcontainer}>
                {currentList.cards.map((card, key) => { return <Card key={key} new={false} movieId={card} deleteCard={() => deleteCard(card, currentList)} ></Card> })}
                <Card new={true} onClick={toggleModal}></Card>
            </ScrollContainer>
            <FindMovieModal show={modalState} hide={toggleModal} submit={(props) => addCard(props, currentList)}></FindMovieModal>
        </div>
    )
}


export default CardList
