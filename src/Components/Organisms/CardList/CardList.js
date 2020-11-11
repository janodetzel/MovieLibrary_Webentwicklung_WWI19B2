import React, { useState, useEffect } from 'react'
import style from './CardList.module.css'
import ScrollContainer from "react-indiana-drag-scroll";
import Card from '../../Molekules/Card/Card';
import FindMovieModal from '../Modal/FindMovieModal';
import DeleteButton from '../../Atoms/Button/DeleteButton';

const CardList = (props) => {

    const [modalState, setModalState] = useState(false);

    const toggleModal = () => {
        setModalState(!modalState)
    }

    const [cards, setCards] = useState([]);


    // useEffect(() => {
    //     let storage = JSON.parse(localStorage.getItem(props.creator)).cardList

    //     if (storage) {
    //         let storedCards = storage[props.thisIndex].cards
    //         setCards(storedCards)
    //     }
    // }, [])

    // useEffect(() => {
    //     let storage = JSON.parse(localStorage.getItem(props.creator))


    //     storage.cardLists[props.thisIndex].cards = cards

    //     // localStorage.setItem(props.creator, JSON.stringify(storage))

    //     console.log("STORAGE", storage.cardLists[props.thisIndex].cards)
    //     // localStorage.setItem(props.title, JSON.stringify(cards));
    // }, [cards])


    const addCard = (movieId) => {
        setCards([...cards, movieId])
    }

    const deleteCard = (props) => {
        setCards(cards.filter(id => id != props));
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
                {cards.map((card, key) => { return <Card key={key} new={false} movieId={card} deleteCard={(props) => deleteCard(props)} ></Card> })}
                <Card new={true} onClick={toggleModal}></Card>
            </ScrollContainer>
            <FindMovieModal show={modalState} hide={toggleModal} submit={(props) => addCard(props)}></FindMovieModal>
        </div>
    )
}


export default CardList
