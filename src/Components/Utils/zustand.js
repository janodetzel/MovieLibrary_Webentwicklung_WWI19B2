import create from "zustand"
import { persist } from "zustand/middleware"
import produce from "immer"
import uuid from "react-uuid"


export const useStore = create(persist(
    (set, get) => ({
        users: [
            {
                id: 123,
                name: "Preview",
                cardLists: [
                    {
                        title: "Action",
                        cards: [550, 550,]
                    },
                    {
                        title: "Drama",
                        cards: [550, 550]
                    }
                ]
            }
        ],

        addUser: userName => set(state => produce(state, draft => {
            draft.users.push({ name: userName, cardLists: [] })
        })),

        deleteUser: userName => set(state => produce(state, draft => {
            const index = draft.users.findIndex(user => user.name === userName)
            if (index !== -1) draft.users.splice(index, 1)
        })),

        getCardLists_v2: (userName) => {
            const userIndex = get().users.findIndex(user => user.name === userName)
            if (userIndex !== -1) return get().users[userIndex].cardLists
        },

        addCardList_v2: (cardListTitle, userName) => set(state => produce(state, draft => {
            const userIndex = draft.users.findIndex(user => user.name === userName)
            if (userIndex !== -1) draft.users[userIndex].cardLists.push({ title: cardListTitle, cards: [] })
        })),

        deleteCardList_v2: (cardListTitle, userName) => set(state => produce(state, draft => {
            const userIndex = draft.users.findIndex(user => user.name === userName)
            const cardListIndex = draft.users[userIndex].cardLists.findIndex(cardList => cardList.title === cardListTitle)
            if (cardListIndex !== -1) draft.users[userIndex].cardLists.splice(cardListIndex, 1)
        })),

        getCards_v2: (cardListTitle, userName) => {
            const userIndex = get().users.findIndex(user => user.name === userName)
            const cardListIndex = get().users[userIndex].cardLists.findIndex(cardList => cardList.title === cardListTitle)
            if (cardListIndex != -1) return get().users[userIndex].cardLists[cardListIndex].cards
        },

        addCard_v2: (movieId, cardListTitle, userName) => set(state => produce(state, draft => {
            const userIndex = draft.users.findIndex(user => user.name === userName)
            const cardListIndex = draft.users[userIndex].cardLists.findIndex(cardList => cardList.title === cardListTitle)
            if (cardListIndex !== -1) draft.users[userIndex].cardLists[cardListIndex].cards.push(movieId)
        })),

        deleteCard_v2: (movieId, cardListTitle, userName) => set(state => produce(state, draft => {
            const userIndex = draft.users.findIndex(user => user.name === userName)
            const cardListIndex = draft.users[userIndex].cardLists.findIndex(cardList => cardList.title === cardListTitle)
            const cardIndex = draft.users[userIndex].cardLists[cardListIndex].cards.findIndex(card => card === movieId)
            if (cardListIndex !== -1) draft.users[userIndex].cardLists[cardListIndex].cards.splice(cardIndex, 1)
        })),


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


// export const useLogIn = create(persist(
//     set => ({
//         user: "",
//         logIn: userId => set({user: userId}),
//         logOut: () => set(user: ""),
//         deleteEverything: () => set({}, true),
//     }),
//     {
//         name: "LogIn", // unique name
//         storage: sessionStorage, // (optional) default is 'localStorage'
//     }
// ))