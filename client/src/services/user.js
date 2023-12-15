import axios from "axios";

export const getUser = async () => {
  try {
    const { data } = await axios.post(`/user/getAll`);
    return Promise.resolve(data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const createUser = async (payload) => {
  try {
    console.log("body data ==>", payload);
    const { data } = await axios.post(`/user`, payload);
	console.log(" axio data ==>", data);
    return Promise.resolve(data);
  } catch (error) {
    return Promise.reject(error);
  }
};
