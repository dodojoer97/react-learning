import { useState, useEffect } from "react"

let globalState = {}
let listeners = []
let actions = {}

export const useStore = () => {
    const setState = useState(globalState)[1]
    console.log("actions: ", actions)
    const dispatch = (actionKey, payload) => {
       const newState = actions[actionKey](globalState, payload)
       globalState = {...globalState, ...newState}

       for(const listener of listeners) {
        listener(globalState)
       }
       
    }

    useEffect(() => {
        listeners.push(setState)

        return () => {
            listeners = listeners.filter(listener => listener !== setState)
        }
    }, [setState])
    return [globalState, dispatch]
}

export const initStore = (userActions, initialState) => {
    if(initialState) {
        globalState = {...globalState, ...initialState}
    }

    actions = {...actions, ...userActions}
}