import { baseUrl, headers, getToken } from '../Globals'


export const signup = (strongParams, navigate) => {
    //***no fetch***//
    // return {
    //     type: "SIGNUP",
    //     payload: details
    // }

    //***for fetch***//
    return async (dispatch) => {
        dispatch({type : "REQUESTING"});

         const resp = await fetch(baseUrl + '/api/users',{
            method: "POST",
            headers,
            body: JSON.stringify(strongParams)
        })
        // .then(resp => {
        //     if (resp.ok) {
        //         resp.json().then(data => {
        //             localStorage.setItem('jwt', data.token)
                    
                    
        //     })
        //     } else {
        //         resp.json().then(e=> {
        //             for (const [key, value] of Object.entries(e)) {
        //                 setErrors(`${key}: ${value}`);
        //               }
        //         })
        //     }
        // }) 

        const data = await resp.json();
        console.log(data.errors)
        if(data.errors) {
            dispatch({ type: "ERRORS", payload: data.errors })
          } else {
            localStorage.setItem('jwt', data.token);
            dispatch({ type: "CLEAR_ERRORS" })
            dispatch({ type: "LOGIN", payload: data });
            navigate('/dashboard')
          }
          dispatch({ type: "DONE_REQUESTING" });
        
        
    }
} 

export const login = (strongParams, navigate) => {
    return async dispatch => {
    dispatch({type : "REQUESTING"});

    const resp = await fetch(baseUrl + '/login',{
        method: "POST",
        headers,
        body: JSON.stringify(strongParams)
    })
    // .then(resp => {
    //     if (resp.ok) {
    //         resp.json().then(data => {
    //             loginUser(data.user)
    //             localStorage.setItem('jwt', data.token)
    //             handleGetOrders(e)
    //             dispatch({type: "LOGIN", payload: data})
                 
    //             dispatch({type: "DONE_REQUESTING"});
    //             navigate('/dashboard')
    //     })
    //     } else {
    //         resp.json().then(e=> setErrors(e.errors))
    //     }
    // })

    const data = await resp.json()
    //console.log(data)
    if(data.errors) {
        dispatch({ type: "ERRORS", payload: data.errors })
      } else {
        localStorage.setItem('jwt', data.token);
        dispatch({ type: "CLEAR_ERRORS" })
        dispatch({ type: "LOGIN", payload: data });
      }
      dispatch({ type: "DONE_REQUESTING" });
      navigate('/dashboard')
    }
}

export const getCurrentUser = () => {
    return async dispatch => {
        //Into Loading State
        dispatch({type: "REQUESTING"})

        const resp = await fetch(baseUrl + '/get-current-user', {
            method: "GET",
            headers: {
            ...headers,
            ...getToken()
            }
        })
        const data = await resp.json()
        
        const payload = {
            user: data.user,
            jwt: localStorage.getItem('jwt')
        }
        if (data.user) {
            dispatch({type: "LOGIN", payload})   
        }

        //Out of Loading State
        dispatch({type: "DONE_REQUESTING"})
        
    }
}


export const logout = () => {
    localStorage.removeItem('jwt')
    return {
        type: "LOGOUT"
    }
}