export const ADD_ORDER = "ADD_ORDER";

export const addOrder = (products, price) => ({
    type: ADD_ORDER,
    products: products,
    price: price
})