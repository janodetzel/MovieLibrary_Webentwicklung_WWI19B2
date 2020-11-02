import React, { useState } from 'react'
import AddListButton from '../Atoms/Button/AddListButton'
import CardList from '../Organisms/CardList/CardList'
import NewListModal from '../Organisms/Modal/NewListModal'
import style from './Home.module.css'


const Home = (props) => {
    const [modalState, setModalState] = useState(false);

    const toggleModal = () => {
        setModalState(!modalState)
    }

    const [state, setstate] = useState({
        name: props.name,
        cardLists: []
    })

    const addList = (props) => {
        console.log(props)
        setstate({
            cardLists: [...state.cardLists, props]
        })
    }

    const removeList = (index) => {
        const newState = state.cardLists
        if (index > -1) {
            newState.splice(index, 1)
        }
        setstate({
            cardLists: newState
        })
    }

    return (
        <div className={style.home}>
            <div className={style.title}>
                <h1>Hi, {props.name}!</h1>
                <p>Create a new List</p>
            </div>
            <div className={style.cardLists}>
                {state.cardLists.map((cardList, key) => (
                    <CardList key={key} title={cardList} nummer={key} />
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

