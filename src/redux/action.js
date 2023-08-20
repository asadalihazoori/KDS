const { Complete_Order, ADD_ORDER, REMOVE_ORDER } = require("./const");


export function add_order(item) {
    return {
        type: ADD_ORDER,
        data: item
    }

}

export function remove_order(item) {
    return {
        type: REMOVE_ORDER,
        data: item
    }

}

export function complete_order(item) {
    return {
        type: Complete_Order,
        data: item
    }

}