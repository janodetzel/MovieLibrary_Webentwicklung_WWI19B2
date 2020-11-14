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



    const { cardLists, addCardList_v2, deleteCardList_v2 } = useStore(state => ({ cardLists: state.getCardLists_v2(props.user), addCardList_v2: state.addCardList_v2, deleteCardList_v2: state.deleteCardList_v2 }), shallow)

    const handleAddCardList = title => {
        addCardList_v2(title, props.user)
    }

    const handleDeleteCardList = title => {
        deleteCardList_v2(title, props.user)
    }


    return (
        <div className={style.home}>
            <div className={style.title}>
                <h1>Hi, {props.user === "Preview" ? "There" : props.user}!</h1>
                <p>Create your own MovieLibrary</p>
            </div>
            <div className={style.cardLists}>
                {cardLists.map((cardList, key) => (
                    <CardList key={uuid()} index={key} user={props.user} title={cardList.title} deleteList={(props) => handleDeleteCardList(props)} />
                ))}
            </div>
            <div className={style.addListButton}>
                <AddListButton onClick={toggleModal}></AddListButton>
            </div>
            <div className={style.footer}>
                <p>Created by <a href="https://www.janodetzel.com">Jano Detzel</a></p>
                <p className={style.logOut} onClick={() => props.logOut()}>Log Out</p>
            </div>
            <NewListModal show={modalState} hide={toggleModal} submit={(props) => handleAddCardList(props)}></NewListModal>
        </div>
    )
}

export default Home

