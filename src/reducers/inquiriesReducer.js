const initialState = []


const inquiriesReducer = (state = initialState, action) => {
    switch(action.type){
        case "ADD_INQUIRY":
            return [...state, action.payload]
        case "DELETE_INQUIRY":
            const id = action.payload
            return [...state.filter((inquiry) => inquiry.id !== id)]
        
        case "SET_INQUIRIES":
            return action.payload
        default:
            return state;
    }
}

export default inquiriesReducer 