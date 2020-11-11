import React, { useState, useEffect } from 'react'
import AddListButton from '../Atoms/Button/AddListButton'
import CardList from '../Organisms/CardList/CardList'
import NewListModal from '../Organisms/Modal/NewListModal'
import style from './Home.module.css'


const Home = (props) => {
    const [modalState, setModalState] = useState(false);

    const toggleModal = () => {
        setModalState(!modalState)
    }

    const [state, setState] = useState(JSON.parse(localStorage.getItem(props.name)) || {
        name: props.name,
        cardLists: [],
    })

    useEffect(() => {
        localStorage.setItem(props.name, JSON.stringify(state));
    }, [state])


    const addList = (props) => {
        setState({
            cardLists: [...state.cardLists, { title: props, cards: [] }]
        })
    }

    const deleteList = (props) => {
        console.log("DELETE LIST", props)
        setState({ cardLists: state.cardLists.filter(list => list.title != props) });
    }

    return (
        <div className={style.home}>
            <div className={style.title}>
                <h1>Hi, {props.name}!</h1>
                <p>Create a new List</p>
            </div>
            <div className={style.cardLists}>
                {console.log(state.cardLists)}
                {state.cardLists.map((cardList, key) => (
                    <CardList key={key} thisIndex={key} creator={state.name} title={cardList.title} deleteList={(props) => deleteList(props)} />
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

