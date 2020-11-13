import React, { useState, useEffect } from 'react'
import AddListButton from '../Atoms/Button/AddListButton'
import CardList from '../Organisms/CardList/CardList'
import NewListModal from '../Organisms/Modal/NewListModal'
import style from './Home.module.css'
import uuid from 'react-uuid'

import { useStore } from '../Utils/zustand'
import shallow from 'zustand/shallow'



const Home = () => {
    const [modalState, setModalState] = useState(false);

    const toggleModal = () => {
        setModalState(!modalState)
    }

    const name = useStore(state => state.name)

    // const { cardLists, addCardList, deleteCardList } = useStore(state => ({ cardLists: state.cardLists, addCardList: state.addCardList, deleteCardList: state.deleteCardList }), shallow)

    const { cardLists, addCardList_v2, deleteCardList_v2 } = useStore(state => ({ cardLists: state.getCardLists_v2(name), addCardList_v2: state.addCardList_v2, deleteCardList_v2: state.deleteCardList_v2 }), shallow)

    const handleAddCardList = title => {
        addCardList_v2(title, name)
        // addCardList(title)
    }

    const handleDeleteCardList = title => {
        deleteCardList_v2(title, name)
        // deleteCardList(title)
    }


    return (
        <div className={style.home}>
            <div className={style.title}>
                <h1>Hi, {name}!</h1>
                <p>Create a new List</p>
            </div>
            <div className={style.cardLists}>
                {cardLists.map((cardList, key) => (
                    <CardList key={uuid()} index={key} user={name} title={cardList.title} deleteList={(props) => handleDeleteCardList(props)} />
                ))}
            </div>
            <div className={style.addListButton}>
                <AddListButton onClick={toggleModal}></AddListButton>
            </div>
            <NewListModal show={modalState} hide={toggleModal} submit={(props) => handleAddCardList(props)}></NewListModal>
        </div>
    )
}

export default Home

