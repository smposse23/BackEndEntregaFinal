import { getApiDao } from "../dbOperations/index.js";
import { convertToDto } from "../dbOperations/dtos/userDto.js";

const { UsersDaoContainer } = await getApiDao(process.env.DBTYPE);

export const getUsers = async () => {
  try {
    const data = await UsersDaoContainer.getAll();
    const response = convertToDto(data);
    return response;
  } catch (error) {
    throw new Error(error);
  }
};

export const getOneUser = async (id) => {
  try {
    const data = await UsersDaoContainer.getById(id);
    const response = convertToDto(data);
    return response;
  } catch (error) {
    throw new Error(error);
  }
};

export const saveUser = async (body) => {
  try {
    return await UsersDaoContainer.save(body);
  } catch (error) {
    throw new Error(error);
  }
};

export const updateUser = async (body, id) => {
  try {
    return await UsersDaoContainer.updateById(body, id);
  } catch (error) {
    throw new Error(error);
  }
};

export const deleteUser = async (userId) => {
  try {
    return await UsersDaoContainer.deleteById(userId);
  } catch (error) {
    throw new Error(error);
  }
};

export const deleteAllUsers = async () => {
  try {
    return await UsersDaoContainer.deleteAll();
  } catch (error) {
    throw new Error(error);
  }
};
