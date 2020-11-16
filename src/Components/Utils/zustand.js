import create from "zustand"
import { persist } from "zustand/middleware"
import produce from "immer"


export const useStore = create(persist(
    (set, get) => ({

        users: [
            {
                name: "Preview",
                cardLists: [
                    {
                        title: "Action",
                        cards: [27205, 155, 670, 64688, 339403, 59440]
                    },
                    {
                        title: "Drama",
                        cards: [550, 1422, 157336, 13, 641]
                    },
                    {
                        title: "Comedy",
                        cards: [207, 105, 546554, 14160, 40807, 740985]
                    }

                ]
            }
        ],
        setName: (props) => set(state => ({ ...state, name: props })),

        addUser: userName => set(state => produce(state, draft => {
            const userExists = get().users.find(user => user.name === userName)
            if (!userExists) {
                draft.users.push({ name: userName, cardLists: [] })
            }
        })),

        deleteUser: userName => set(state => produce(state, draft => {
            const index = draft.users.findIndex(user => user.name === userName)
            if (index !== -1) draft.users.splice(index, 1)
        })),

        getCardLists: (userName) => {
            const userIndex = get().users.findIndex(user => user.name === userName)
            if (userIndex !== -1) return get().users[userIndex].cardLists
        },

        addCardList: (cardListTitle, userName) => set(state => produce(state, draft => {
            const userIndex = draft.users.findIndex(user => user.name === userName)
            if (userIndex !== -1) draft.users[userIndex].cardLists.push({ title: cardListTitle, cards: [] })
        })),

        deleteCardList: (cardListTitle, userName) => set(state => produce(state, draft => {
            const userIndex = draft.users.findIndex(user => user.name === userName)
            const cardListIndex = draft.users[userIndex].cardLists.findIndex(cardList => cardList.title === cardListTitle)
            if (cardListIndex !== -1) draft.users[userIndex].cardLists.splice(cardListIndex, 1)
        })),

        getCards: (cardListTitle, userName) => {
            const userIndex = get().users.findIndex(user => user.name === userName)
            const cardListIndex = get().users[userIndex].cardLists.findIndex(cardList => cardList.title === cardListTitle)
            if (cardListIndex !== -1) return get().users[userIndex].cardLists[cardListIndex].cards
        },

        addCard: (movieId, cardListTitle, userName) => set(state => produce(state, draft => {
            const userIndex = draft.users.findIndex(user => user.name === userName)
            const cardListIndex = draft.users[userIndex].cardLists.findIndex(cardList => cardList.title === cardListTitle)
            if (cardListIndex !== -1) draft.users[userIndex].cardLists[cardListIndex].cards.push(movieId)
        })),

        deleteCard: (movieId, cardListTitle, userName) => set(state => produce(state, draft => {
            const userIndex = draft.users.findIndex(user => user.name === userName)
            const cardListIndex = draft.users[userIndex].cardLists.findIndex(cardList => cardList.title === cardListTitle)
            const cardIndex = draft.users[userIndex].cardLists[cardListIndex].cards.findIndex(card => card === movieId)
            if (cardListIndex !== -1) draft.users[userIndex].cardLists[cardListIndex].cards.splice(cardIndex, 1)
        })),
    }),
    {
        name: "MovieStorage", // unique name
        storage: localStorage, // (optional) default is 'localStorage'
    }
))


export const useSession = create(persist(
    set => ({
        user: null,
        logIn: userName => set({ user: userName }),
        logOut: () => set({ user: null }, true),
    }),
    {
        name: "Session", // unique name
        storage: sessionStorage, // (optional) default is 'localStorage'
    }
))