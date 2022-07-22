import { baseUrl, headers, getToken } from '../Globals'


export const addInquiry = (details ) => {
    const payload=  {
        ...details
    }
    return {
        type: "ADD_INQUIRY",
        payload
    }
}

export const loadInquiries = () => {
    return async dispatch => {
        dispatch({type: "REQUESTING"})
        const resp = await fetch(baseUrl + '/order_inquiries', {
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