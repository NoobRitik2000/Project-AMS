import mongoose from "mongoose";

const assetSchema = new mongoose.Schema(
  {

    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["Available", "In-use", "Maintenance"], // Example enum values
      required: true,
    },
    ASSET_ID: {
      type: Number,
      required: true,
      unique:true,
    },
  },
  {
    timestamps: true,
  }
);

const Asset = mongoose.model("Asset", assetSchema);

export default Asset;
// const mongoose = require('mongoose');

// const assetSchema = new mongoose.Schema({
//   serialNumber: { type: String, required: true },
//   name: { type: String, required: true },
//   type: { type: String, required: true },
//   status: { type: String, required: true },
// });

// const AssetModel = mongoose.model("Asset", assetSchema);

// export default AssetModel;