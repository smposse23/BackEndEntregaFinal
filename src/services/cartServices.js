import { getApiDao } from "../dbOperations/index.js";

const { CartDaoContainer } = await getApiDao(process.env.DBTYPE);

export const getCarts = async () => {
  try {
    return CartDaoContainer.getAll();
  } catch (error) {
    throw new Error(error);
  }
};

export const addCart = async (body) => {
  try {
    return await CartDaoContainer.save(body);
  } catch (error) {
    throw new Error(error);
  }
};

export const getOneCart = async (id) => {
  try {
    return await CartDaoContainer.getById(id);
  } catch (error) {
    throw new Error(error);
  }
};

export const getCartByUserId = async (id) => {
  try {
    return await CartDaoContainer.getByUserId(id);
  } catch (error) {
    throw new Error(error);
  }
};

export const updateCart = async (body, id) => {
  try {
    return await CartDaoContainer.updateById(body, id);
  } catch (error) {
    throw new Error(error);
  }
};

export const deleteCart = async (id) => {
  try {
    return await CartDaoContainer.deleteById(id);
  } catch (error) {
    throw new Error(error);
  }
};

export const deleteAllCarts = async () => {
  try {
    return await CartDaoContainer.deleteAll();
  } catch (error) {
    throw new Error(error);
  }
};
