import { ADD_ORDER, REMOVE_ORDER, UPDATE_Time } from "./const";

const initialState = {
    data: [],
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
                return item != action.data
            })
            return {
                data: [...result]
            };

        case UPDATE_Time:
            const updatedData = state.data.map(item => {
                if (item.callNo === action.callNo) {
                    return {
                        ...item,
                        time: action.time
                    }
                }
                return item;
            })
            return {
                data: updatedData
            }


        default:
            return state;
    }

}