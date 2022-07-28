const initialState = [];

const ordersReducer = (state=initialState, action) => {
    switch(action.type){
        case "ADD_ORDER":
            return [...state, action.payload]
        case "SEND_ORDER":
            return [...state, action.payload]
        case "DELETE_ORDER":
            const id = action.payload
            return [...state.filter((order) => order.id !== id)]
        case "SET_ORDERS":
            return action.payload
        default: 
        return state;
    }
}

export default ordersReducer;