import { Complete_Order } from "./const";

const initialState = {
    data: []
};

export const completeOrderReducer = (state = initialState, action) => {
    switch (action.type) {
        case Complete_Order:
            return {
                ...state,
                data: [...state.data, action.data]
            };

        default:
            return state;
    }

}