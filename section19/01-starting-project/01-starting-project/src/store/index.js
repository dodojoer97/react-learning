import * as redux from "redux"

const defaultState = {
    counter: 0
}

const counterReducer = (state = defaultState, action) => {
    if(action.type === 'increment') {
        return  {
            counter: state.counter + 1
        }
    }

    if(action.type === 'decrement') {
        return  {
            counter: state.counter - 1
        }
    }
    
    return state
}


const store = redux.createStore(counterReducer)

const counterSubscriber = () => {
    const state = store.getState()
    console.log("state: ", state)
}

store.subscribe(counterSubscriber)

export default store