import axios from 'axios';

const API_URL = 'https://dummyjson.com';

export const fetchItems = async () => {
  const response = await axios.get(`${API_URL}/items`);
  return response.data;
};

export const createItem = async (item: any) => {
  const response = await axios.post(`${API_URL}/items/add`, item);
  return response.data;
};

export const updateItem = async (id: number, item: any) => {
  const response = await axios.put(`${API_URL}/items/${id}`, item);
  return response.data;
};

export const deleteItem = async (id: number) => {
  const response = await axios.delete(`${API_URL}/items/${id}`);
  return response.data;
};
