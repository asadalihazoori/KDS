import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from "redux-thunk";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistStore, persistReducer } from "redux-persist";
// import { createStore, combineReducers, applyMiddleware } from 'redux'

import { completeOrderReducer } from "./completeOrderReducer";
import { addOrderReducer } from "./addOrderReducer";

const allReducers = combineReducers({
    completedOrders: completeOrderReducer,
    addOrder: addOrderReducer
})

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['addOrder', 'completedOrders'],
    blacklist: [''],
};

const persistedReducer = persistReducer(persistConfig, allReducers);

export default store = createStore(
    persistedReducer,
    applyMiddleware(thunk));

export const persistedStore = persistStore(store);

