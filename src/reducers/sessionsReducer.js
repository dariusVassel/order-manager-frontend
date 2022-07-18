const initialState = {
    currentUser: {
        id: 3,
        username: "samarth_gwalani",
        role: "admin",
        organization_id: 1
    },
    loggedIn: true
}

const sessionsReducer = (state = initialState, action) =>{
    switch(action.type){
        default:
            return state;
    }
}

export default sessionsReducer;
