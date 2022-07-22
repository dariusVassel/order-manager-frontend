const initialState = [{
    id: 1,
    po_number: 1000,
    po_date: null,
    internal_ref_number: null,
    size: "20/40",
    glaze: "10",
    price_kg: 4,
    cartons: 835,
    packing: "6x1",
    kgs_carton: 6,
    packing_specs: "printed bags",
    shipment_date: null,
    payment_terms: "sight dp or lc at 75 days",
    port_to: "Valencia, Spain",
    port_from: "Pipavav, India",
    order_total: 21292,
    total_kilos: 5010,
    order_status: "registered",
    buyer_id: 1,
    seller_id: 3,
    order_item_id: 1,
    selected_freeze: null
    }, {
        id: 2,
        po_number: 1001,
        po_date: null,
        internal_ref_number: null,
        size: "20/40",
        glaze: "10",
        price_kg: 4,
        cartons: 835,
        packing: "6x1",
        kgs_carton: 6,
        packing_specs: "printed bags",
        shipment_date: null,
        payment_terms: "sight dp or lc at 75 days",
        port_to: "Valencia, Spain",
        port_from: "Pipavav, India",
        order_total: 21292,
        total_kilos: 5010,
        order_status: "registered",
        buyer_id: 1,
        seller_id: 3,
        order_item_id: 1,
        selected_freeze: null
        }
];

const ordersReducer = (state=initialState, action) => {
    switch(action.type){
        default: 
        return state;
    }
}

export default ordersReducer;