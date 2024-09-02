import express from "express";
import {
  addAssets,
  getAllAssets,
  getAssetById,
  updateAsset,
  deleteAsset,
  
} from "../controllers/assetController.js";

const router1 = express.Router();

// Create a new asset
router1.post("/addAssets", addAssets);

// Read all assets
router1.get("/getAllAssets", getAllAssets);

// Read a single asset
router1.get("/getAsset/:id", getAssetById);

// Update an asset
router1.put("/updateAsset/:id", updateAsset);

// Delete an asset
router1.delete("/deleteAsset/:id", deleteAsset);



export default router1;
