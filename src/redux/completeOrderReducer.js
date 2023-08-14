import { Complete_Order } from "./const";

const initialState = [];

export const completeOrderReducer = (state = initialState, action) => {
    switch (action.type) {
        case Complete_Order:
            console.log('data added');
            return [
                ...state,
                action.data
            ];

        default:
            return state;
    }

}