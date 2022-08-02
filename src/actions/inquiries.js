import { baseUrl, headers, getToken } from '../Globals'


export const addInquiry = (strongParams, navigate ) => {
    //***no fetch***//
    // const payload=  {
    //     ...strongParams
    // }
    // return {
    //     type: "ADD_INQUIRY",
    //     payload
    // }

    //***for fetch***//
    return async (dispatch) => {
        dispatch({type : "REQUESTING"});

        const resp = await fetch(baseUrl + '/api/order_inquiries',{
            method: "POST",
        headers: {
            ...headers,
            ...getToken()
        },
        body: JSON.stringify(strongParams)
        })
        const data = await resp.json();
        console.log(data)
        if(data.errors) {
            dispatch({ type: "ERRORS", payload: data.errors })
          } else {

            dispatch({ type: "CLEAR_ERRORS" })
            dispatch({type: "ADD_INQUIRY", payload: data})
            navigate('/inquiries')
          }
          dispatch({ type: "DONE_REQUESTING" });
    }
}

export const deleteInquiry = (navigate, id ) => {
  //***for fetch***//
  return async (dispatch) => {
      dispatch({type : "REQUESTING"});

      const resp = await fetch(baseUrl + `/api/order_inquiries/${id}`, {
        method: "DELETE",
        headers: {
          ...headers,
          ...getToken()
        }}).then((r) => {
          if (r.ok) {
            dispatch({type: "DELETE_INQUIRY", payload: id})
          }
        });
        dispatch({ type: "DONE_REQUESTING" });
  }
}


export const loadInquiries = () => {
    return async dispatch => {
        dispatch({type: "REQUESTING"})
        const resp = await fetch(baseUrl + '/api/order_inquiries', {
            headers: {
              ...headers,
              ...getToken()
            }
          })

          const data = await resp.json()
    
          dispatch({type: "SET_INQUIRIES", payload: data})
          dispatch({type: "DONE_REQUESTING"})
    }
}

export const sendInquiry = (navigate, strongParams, id ) => {


  //***for fetch***//
  return async (dispatch) => {
    dispatch({type : "REQUESTING"});
    console.log(strongParams)
    const resp = await fetch(baseUrl + `/api/order_inquiries/${id}`,{
      method: "PATCH",
      headers: {
          ...headers,
          ...getToken()
      },
      body: JSON.stringify(strongParams)
    })

    const data = await resp.json();
    console.log(data)
    if(data.errors) {
        dispatch({ type: "ERRORS", payload: data.errors })
      } else {

        dispatch({ type: "CLEAR_ERRORS" })
        dispatch({type: "SEND_INQUIRY", payload: data})
        dispatch({type: "LOAD_INQUIRY"})
        navigate('/inquiries')
      }
      console.log("WE IN THE HOUSE")
        dispatch({ type: "DONE_REQUESTING" });
  }
}

export const editInquiry = (navigate, strongParams, id ) => {


  //***for fetch***//
  return async (dispatch) => {
    dispatch({type : "REQUESTING"});
    console.log(strongParams)
    const resp = await fetch(baseUrl + `/api/order_inquiries/${id}`,{
      method: "PATCH",
      headers: {
          ...headers,
          ...getToken()
      },
      body: JSON.stringify(strongParams)
    })

    const data = await resp.json();
    console.log(data)
    if(data.errors) {
        dispatch({ type: "ERRORS", payload: data.errors })
      } else {

        dispatch({ type: "CLEAR_ERRORS" })
        dispatch({type: "EDIT_INQUIRY", payload: data})
        navigate('/inquiries')
      }
      //console.log("WE IN THE HOUSE")
        dispatch({ type: "DONE_REQUESTING" });
  }
}
