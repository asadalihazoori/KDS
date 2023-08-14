import { ADD_ORDER } from "./const";

const initialState = [];

export const addOrderReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_ORDER:
            console.log('data recieved')
            return [
                ...state,
                action.data
            ];

        default:
            return state;
    }

}