export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const SET_PRODUCT = "SET_PRODUCT";

export const deleteProduct = id => ({
  type: DELETE_PRODUCT,
  pid: id
});

export const createProduct = (title, imageUrl, description, price) => {
  return async dispatch => {
    try {
      const response = await fetch(
        "https://rn-shop-app-6c2fa.firebaseio.com/products.json",
        {
          method: "POST",
          "Content-Type": "application/json",
          body: JSON.stringify({
            title,
            description,
            imageUrl,
            price
          })
        }
      );
      if (!response.ok) {
        throw new Error("Something went wrong!!!");
      }

      let responseData = await response.json();

      dispatch({
        type: CREATE_PRODUCT,
        productData: {
          id: responseData.name,
          title,
          description,
          imageUrl,
          price
        }
      });
    } catch (error) {
      throw error;
    }
  };
};

export const updateProduct = (id, title, imageUrl, description) => {
  return async dispatch => {
    try {
      const response = await fetch(
        `https://rn-shop-app-6c2fa.firebaseio.com/products/${id}.json`,
        {
          method: "PATCH",
          "Content-Type": "application/json",
          body: JSON.stringify({
            title,
            description,
            imageUrl
          })
        }
      );
      if (!response.ok) {
        throw new Error("Something went wrong!!!");
      }
      let responseData = await response.json();
      
      dispatch({
        type: UPDATE_PRODUCT,
        productId: id,
        productData: {
          title: responseData.title,
          description: responseData.description,
          imageUrl: responseData.imageUrl
        }
      });
    } catch (error) {
      throw error;
    }
  };
};

export const getProduct = () => {
  return async dispatch => {
    const response = await fetch(
      "https://rn-shop-app-6c2fa.firebaseio.com/products.json"
    );
    if (!response.ok) {
      throw new Error("Something went wrong!!!");
    }

    let responseData = await response.json();

    dispatch({
      type: SET_PRODUCT,
      products: responseData
    });
  };
};
