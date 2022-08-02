import { baseUrl, headers, getToken } from '../Globals'

export const loadOrders = () => {
    return async dispatch => {
        dispatch({type: "REQUESTING"})
        const resp = await fetch(baseUrl + '/api/orders', {
            headers: {
              ...headers,
              ...getToken()
            }
          })

          const data = await resp.json()
    
          dispatch({type: "SET_ORDERS", payload: data})
          dispatch({type: "DONE_REQUESTING"})
    }
}

export const deleteOrder = (navigate, id ) => {
  //***for fetch***//
  return async (dispatch) => {
      dispatch({type : "REQUESTING"});

      const resp = await fetch(baseUrl + `/api/orders/${id}`, {
        method: "DELETE",
        headers: {
          ...headers,
          ...getToken()
        }}).then((r) => {
          if (r.ok) {
            dispatch({type: "DELETE_ORDER", payload: id})
          }
        });
        dispatch({ type: "DONE_REQUESTING" });
  }
}