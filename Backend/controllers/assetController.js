import mongoose from "mongoose";
import Asset from "../Models/Asset.js";

// Create a new asset
// Create a new asset
export const addAssets = async (req, res) => {
  try {
    const { name, type, status,ASSET_ID} = req.body;

    // Check if any field is missing
    if (!name || !type || !status || !ASSET_ID) {
      return res.status(400).json({ message: "All fields are required." });
    }
    const existingAsset = await Asset.findOne({ ASSET_ID });
    if (existingAsset) {
      return res.status(400).json({ message: "Asset ID must be unique." });
    }
    // Create a new asset
    const newAsset = new Asset({ name, type, status,ASSET_ID });
    const savedAsset = await newAsset.save();

    res.status(201).json(savedAsset);
  } catch (error) {
    console.error("Error adding asset:", error); // Log the error for debugging
    res.status(500).json({ message: "Internal server error" });
  }
};
// Get all assets
export const getAllAssets = async (req, res) => {
  try {
    const assets = await Asset.find();
    res.status(200).json(assets);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving assets", error: error.message });
  }
};

// Get a single asset by ID
export const getAssetById = async (req, res) => {
  try {
    const asset = await Asset.findById(req.params.id);
    if (!asset) {
      return res.status(404).json({ message: "Asset not found" });
    }
    res.status(200).json(asset);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving asset", error: error.message });
  }
};

// Update an asset by ID
export const updateAsset = async (req, res) => {
  try {
    const asset = await Asset.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!asset) {
      return res.status(404).json({ message: "Asset not found" });
    }
    res.status(200).json({ message: "Asset updated successfully", asset });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating asset", error: error.message });
  }
};

// Delete an asset by ID
export const deleteAsset = async (req, res) => {
  try {
    const asset = await Asset.findByIdAndDelete(req.params.id);
    if (!asset) {
      return res.status(404).json({ message: "Asset not found" });
    }
    res.status(200).json({ message: "Asset deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting asset", error: error.message });
  }
};

