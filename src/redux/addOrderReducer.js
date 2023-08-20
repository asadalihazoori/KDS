import { ADD_ORDER, REMOVE_ORDER } from "./const";

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

        case REMOVE_ORDER:
            let result = state.data.filter(item => {
                return item.id != action.data
            })
            return {
                data: [...result]
            };

        default:
            return state;
    }

}