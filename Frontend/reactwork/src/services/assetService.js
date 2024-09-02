import axios from "axios";

const API_URL = "http://localhost:5000/api/assets"; // Update with your backend URL if different

export const addAssets = async (AssetData) => {
  const response = await axios.post(`${API_URL}/addAssets`, AssetData);
  return response.data;
};

export const getAllAssets = async (AssetData) => {
  const response = await axios.get(`${API_URL}/getAllAssets`, AssetData);
  return response.data;
};

export const updateAsset = async (id,AssetData) => {
  const response = await axios.put(`${API_URL}/updateAsset/${id}`, AssetData);
  return response.data;
};

export const deleteAsset = async (id) => {
  const response = await axios.put(`${API_URL}/deleteAsset/${id}`);
  return response.data;
};

export const getAssetById = async (id) =>{
  const response = await axios.get(`${API_URL}/getAsset/${id}`);
  return response.data;
}