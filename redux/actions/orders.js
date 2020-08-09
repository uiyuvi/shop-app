import Order from "../../models/order";

export const ADD_ORDER = "ADD_ORDER";
export const SET_ORDER = "SET_ORDER";

export const addOrder = (products, price) => {
    return async dispatch => {
        const date = new Date();
        const response = await fetch(
            "https://rn-shop-app-6c2fa.firebaseio.com/orders/u1.json",
            {
              method: "POST",
              "Content-Type": "application/json",
              body: JSON.stringify({
                products,
                price,
                date: date.toISOString()
              })
            }
          );
          if (!response.ok) {
            throw new Error("Something went wrong!!!");
          }
    
          let responseData = await response.json();
        dispatch({
            type: ADD_ORDER,
            id: responseData.name,
            products: products,
            price: price,
            date
        })
    }

}

export const getOrders = () => {
    return async dispatch => {
      const response = await fetch(
        "https://rn-shop-app-6c2fa.firebaseio.com/orders/u1.json"
      );
      if (!response.ok) {
        throw new Error("Something went wrong!!!");
      }
  
      let responseData = await response.json();

      let updatedOrders = [];

      for (const key in responseData){
          const order = new Order(key, responseData[key].products, responseData[key].price, new Date(responseData[key].date));
          updatedOrders.push(order);
      }

      dispatch({
        type: SET_ORDER,
        orders: updatedOrders
      });
    };
  };