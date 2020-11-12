import create from "zustand"
import { persist } from "zustand/middleware"

export const useStore = create(persist(
    set => ({
        name: "",
        cardLists: [{
            title: "Action",
            cards: [550],
        }],
        setName: (props) => set({ name: props }),
        addCardList: (props) => set(state => ({ cardLists: [...state.cardLists, { title: props, cards: [] }] })),
        deleteCardList: (props) => set(state => ({ cardLists: state.cardLists.filter(list => list.title != props) })),

        addCard: (card, list) => set(state => ({ cardLists: [{ title: list.title, cards: [...list.cards, card] }] })),
        deleteCard: (card, list) => set(state => ({ cardLists: [{ title: list.title, cards: list.cards.filter(id => id != card) }] }))
    }),
    {
        name: "MovieStorage", // unique name
        storage: localStorage, // (optional) default is 'localStorage'
    }
))