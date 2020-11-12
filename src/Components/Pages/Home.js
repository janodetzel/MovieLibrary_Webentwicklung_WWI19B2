import React, { useState, useEffect } from 'react'
import AddListButton from '../Atoms/Button/AddListButton'
import CardList from '../Organisms/CardList/CardList'
import NewListModal from '../Organisms/Modal/NewListModal'
import style from './Home.module.css'

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

    const [state, setState] = useState({
        name: props.name,
        cardLists: [],
    })



    const addList = (props) => {
        addCardList(props)
        // setState({
        //     ...state,
        //     cardLists: [...state.cardLists, { title: props }]
        // })
    }

    const deleteList = (props) => {
        deleteCardList(props)
        // setState({ cardLists: state.cardLists.filter(list => list.title != props) });
    }

    return (
        <div className={style.home}>
            <div className={style.title}>
                <h1>Hi, {name}!</h1>
                <p>Create a new List</p>
            </div>
            <div className={style.cardLists}>
                {cardLists.map((cardList, key) => (
                    <CardList key={key} index={key} creator={name} title={cardList.title} deleteList={(props) => deleteList(props)} />
                ))}
            </div>
            <div className={style.addListButton}>
                <AddListButton onClick={toggleModal}></AddListButton>
            </div>
            <NewListModal show={modalState} hide={toggleModal} submit={(props) => addList(props)}></NewListModal>
        </div>
    )
}

export default Home

