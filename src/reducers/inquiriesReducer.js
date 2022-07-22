const initialState = [
        {
            "id": 2,
            "item_id": 1,
            "product_name": "Whole Cleaned Cuttlefish",
            "quantity": 3000,
            "packing": "10x1",
            "glaze": "15",
            "shipment_date": "2022-07-13",
            "contact_name": "",
            "user_id": 3,
            "contact_id": 3,
            "order_item_id": null,
            "contact": {
                "id": 3,
                "first_name": "Brent",
                "last_name": "Poker",
                "email": "samarth.gwalani94@gmail.com",
                "company": "Raadegast",
                "country": "United States"
            }
        }
]

const inquiriesReducer = (state = initialState, action) => {
    switch(action.type){
        case "ADD_INQUIRY":
            return [...state, action.payload]
        default:
            return state;
    }
}

export default inquiriesReducer