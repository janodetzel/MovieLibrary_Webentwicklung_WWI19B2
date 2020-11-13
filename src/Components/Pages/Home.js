import React, { useState, useEffect } from 'react'
import AddListButton from '../Atoms/Button/AddListButton'
import CardList from '../Organisms/CardList/CardList'
import NewListModal from '../Organisms/Modal/NewListModal'
import style from './Home.module.css'
import uuid from 'react-uuid'

import { useStore } from '../Utils/zustand'
import shallow from 'zustand/shallow'



const Home = (props) => {
    const [modalState, setModalState] = useState(false);

    const toggleModal = () => {
        setModalState(!modalState)
    }

    const name = useStore(state => state.name)
    const { cardLists, addCardList, deleteCardList } = useStore(state => ({ cardLists: state.cardLists, addCardList: state.addCardList, deleteCardList: state.deleteCardList }), shallow)

    console.log("ZUSTAND CARDLISTS", cardLists)

    return (
        <div className={style.home}>
            <div className={style.title}>
                <h1>Hi, {name}!</h1>
                <p>Create a new List</p>
            </div>
            <div className={style.cardLists}>
                {cardLists.map((cardList, key) => (
                    <CardList key={uuid()} index={key} creator={name} title={cardList.title} deleteList={(props) => deleteCardList(props)} />
                ))}
            </div>
            <div className={style.addListButton}>
                <AddListButton onClick={toggleModal}></AddListButton>
            </div>
            <NewListModal show={modalState} hide={toggleModal} submit={(props) => addCardList(props)}></NewListModal>
        </div>
    )
}

export default Home

