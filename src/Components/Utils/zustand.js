import uuid from 'react-uuid'
import create from "zustand"
import { persist } from "zustand/middleware"

export const useStore = create(persist(
    set => ({
        // users: [
        //     {
        //         name: "Preview",
        //         cardLists: {
        //             [uuid()]: {
        //                 title: "Action",
        //                 cards: [550, 550,]
        //             },
        //             [uuid()]: {
        //                 title: "Drama",
        //                 cards: [550, 550]
        //             }
        //         }
        //     }
        // ],

        name: "",
        cardLists: [{
            title: "Action",
            cards: [550],
        }, {
            title: "Drama",
            cards: [550],
        }, {
            title: "Comedy",
            cards: [550],
        }],
        setName: (props) => set(state => ({ ...state, name: props })),
        addCardList: (props) => set(state => ({ cardLists: [...state.cardLists, { title: props, cards: [] }] })),
        deleteCardList: (props) => set(state => ({ cardLists: state.cardLists.filter(list => list.title !== props) })),

        // addCard: (card, list) => set({ cardLists: [{ title: list.title, cards: [...list.cards, card] }] }),
        addCard: (card, list) => set(state => {
            let cardLists = [...state.cardLists]
            let cards = cardLists.find(cardList => cardList.title === list.title).cards
            cards = [...cards, card]
            cardLists.find(cardList => cardList.title === list.title).cards = cards
            return { cardLists: cardLists }
        }),
        // deleteCard: (card, list) => set({ cardLists: [{ title: list.title, cards: list.cards.filter(movieId => movieId !== card) }] }),
        deleteCard: (card, list) => set(state => {
            let cardLists = [...state.cardLists]
            let cards = cardLists.find(cardList => cardList.title === list.title).cards
            cards = cards.filter(movieId => movieId !== card)
            cardLists.find(cardList => cardList.title === list.title).cards = cards
            return { cardLists: cardLists }
        }),

        deleteEverything: () => set({}, true),
    }),
    {
        name: "MovieStorage", // unique name
        storage: localStorage, // (optional) default is 'localStorage'
    }
))