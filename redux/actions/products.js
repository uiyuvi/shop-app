import Product from "../../models/product";

export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const SET_PRODUCT = "SET_PRODUCT";

export const deleteProduct = id => ({
  type: DELETE_PRODUCT,
  pid: id
});

export const createProduct = (title, description, imageUrl, price) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token
    const userId = getState().auth.userId
    try {
      const response = await fetch(
        `https://rn-shop-app-6c2fa.firebaseio.com/products.json?auth=${token}`,
        {
          method: "POST",
          "Content-Type": "application/json",
          body: JSON.stringify({
            title,
            description,
            imageUrl,
            price,
            ownerId: userId
          })
        }
      );
      let responseData = await response.json();
      if (!response.ok) {
        throw new Error("Something went wrong!!!");
      }


      dispatch({
        type: CREATE_PRODUCT,
        productData: {
          id: responseData.name,
          title,
          description,
          imageUrl,
          price,
          ownerId: userId
        }
      });
    } catch (error) {
      throw error;
    }
  };
};

export const updateProduct = (id, title, imageUrl, description) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token
    try {
      const response = await fetch(
        `https://rn-shop-app-6c2fa.firebaseio.com/products/${id}.json?auth=${token}`,
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
      let responseData = await response.json();
      if (!response.ok) {
        throw new Error("Something went wrong!!!");
      }

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
  return async (dispatch, getState) => {
    const response = await fetch(
      "https://rn-shop-app-6c2fa.firebaseio.com/products.json"
    );
    let responseData = await response.json();

    if (!response.ok) {
      throw new Error("Something went wrong!!!");
    }

    let loadedProducts = [];
    for (const key in responseData) {
      loadedProducts.push(
        new Product(
          key,
          responseData[key].ownerId,
          responseData[key].title,
          responseData[key].imageUrl,
          responseData[key].description,
          responseData[key].price
        )
      );
    }

    dispatch({
      type: SET_PRODUCT,
      availableProducts: loadedProducts,
      userProducts: loadedProducts.filter(product => product.userId === getState().auth.userId)
    });
  };
};
