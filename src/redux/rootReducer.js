const { combineReducers } = require("redux");
import { addOrderReducer } from "./addOrderReducer";
import { completeOrderReducer } from "./completeOrderReducer";

export default combineReducers({
    completeOrderReducer,
    addOrderReducer
})