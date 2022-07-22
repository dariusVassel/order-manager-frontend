const initialState = {
    // currentUser: {
    //     id: 3,
    //     username: "samarth_gwalani",
    //     role: "admin",
    //     organization_id: 1
    // },
    currentUser: {},
    loggedIn: false
}

const sessionsReducer = (state = initialState, action) =>{
    switch(action.type){
        case "LOGIN":
            return {
                currentUser: action.payload.user,
                loggedIn: true
            } 
        case "LOGOUT":
            return initialState;
            
        default:
            return state;
    }
}

export default sessionsReducer;
