export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const CREATE_PRODUCT = "CREATE_PRODUCT";

export const deleteProduct = id => ({
  type: DELETE_PRODUCT,
  pid: id
});

export const createProduct = (title, imageUrl, description, price) => ({
  type: CREATE_PRODUCT,
  productData:{
    title,
    description,
    imageUrl,
    price
  }
});

export const updateProduct = (id, title, imageUrl, description) => ({
  type: UPDATE_PRODUCT,
  productId: id,
  productData:{
    title,
    description,
    imageUrl
  }
})
