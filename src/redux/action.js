const { Complete_Order, ADD_ORDER } = require("./const");

export function complete_order(item) {
    return {
        type: Complete_Order,
        data: item
    }

}

export function add_order(item) {
    return {
        type: ADD_ORDER,
        data: item
    }

}