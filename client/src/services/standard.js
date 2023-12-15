import axios from "axios";

export const getStandards = async () => {
  try {
    const { data } = await axios.get(`/standard/getAll`);
    return Promise.resolve(data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const createStandard = async (payload) => {
  try {
    const { data } = await axios.post(`/standard/`, payload);
    return Promise.resolve(data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getStandardsById = async (userId) => {
  try {
    const { data } = await axios.get(`/standard/getById/${userId}`);
    return Promise.resolve(data);
  } catch (error) {
    return Promise.reject(error);
  }
};
