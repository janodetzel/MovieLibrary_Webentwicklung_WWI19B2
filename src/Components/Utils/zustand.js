import create from "zustand"
import { persist } from "zustand/middleware"

export const useStore = create(persist(
    (set, get) => ({
        name: "",
        cardLists: [{
            title: "Action",
            cards: [550],
            // addCard: (card, list) => set(console.log("THIS IS THE CARD", list.title)),
            // addCard: (card, list) => set(state => ({ cardLists: [...state.cardLists, { title: list.title, cards: [...list.cards, card] }] })),
            addCard: (card, list) => set(state => ({ cardLists: [{ title: list.title, cards: [...list.cards, card] }] })),
            // deleteCard: (card, list) => set(state => ({ cards: state.cards.filter(id => id != card) }))
        }],
        setName: (props) => set({ name: props }),
        addCardList: (props) => set(state => ({ cardLists: [...state.cardLists, { title: props, cards: [] }] })),
        deleteCardList: (props) => set(state => ({ cardLists: state.cardLists.filter(list => list.title != props) })),
    }),
    {
        name: "MovieStorage", // unique name
        storage: localStorage, // (optional) default is 'localStorage'
    }
))