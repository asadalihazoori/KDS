import { ADD_ORDER } from "./const";

const initialState = {
    data: []
};

export const addOrderReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_ORDER:
            return {
                ...state,
                data: [...state.data, action.data]
            };

        default:
            return state;
    }

}