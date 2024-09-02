import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
  MenuItem,
  Select,
} from "@mui/material";
import swal from "sweetalert";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AssetTable = () => {
  const [assets, setAssets] = useState([]);

  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [status, setStatus] = useState("");
  const [ASSET_ID, setAssetId] = useState("");
  const [IdError, setIdError] = useState(false); // State for name error
  const [IdHelperText, setIdHelperText] = useState(""); // State for error message

  const [nameError, setNameError] = useState(false); // State for name error
  const [nameHelperText, setNameHelperText] = useState(""); // State for error message

  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const storedAssets = JSON.parse(localStorage.getItem("assets"));

    if (storedAssets) {
      setAssets(storedAssets);
    }
  }, []);

  const validateName = (name) => {
    // Regular expression to match only letters
    const nameRegex = /^[A-Za-z\s]+$/;
    return nameRegex.test(name);
  };

  const validateId = (ASSET_ID) => {
    const idRegex = /^[0-9]+$/;
    return idRegex.test(ASSET_ID);
  };

  const handleAddAsset = async (e) => {
    e.preventDefault();

    if (!name || !type || !status || !ASSET_ID) {
      swal({
        title: "Error!",
        text: "All fields are required.",
        icon: "warning",
        buttons: "OK",
      });
      return;
    }

    if (!validateName(name)) {
      setNameError(true);
      setNameHelperText("Asset name must only contain letters.");
      return;
    } else {
      setNameError(false);
      setNameHelperText("");
    }

    if (!validateId(ASSET_ID)) {
      setIdError(true);
      setIdHelperText("Asset ID must only contain numbers.");
      return;
    } else {
      setIdError(false);
      setIdHelperText("");
    }

    // Check if ASSET_ID is unique
    const isDuplicateId = assets.some((asset) => asset.ASSET_ID === ASSET_ID);
    if (isDuplicateId) {
      setIdError(true);
      setIdHelperText("Asset ID must be unique. This ID is already in use.");
      return;
    } else {
      setIdError(false);
      setIdHelperText("");
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/assets/addAssets",
        {
          name,
          type,
          status,
          ASSET_ID,
        }
      );

      if (response.data) {
        const updatedAssets = [...assets, response.data];
        setAssets(updatedAssets);
        localStorage.setItem("assets", JSON.stringify(updatedAssets)); // Save to local storage
        swal({
          title: "Success!",
          text: "Asset added successfully!",
          icon: "success",
          buttons: "OK",
        }).then(() => {
          setAssets([...assets, response.data]); // Add the new asset to the table

          setName("");
          setType("");
          setStatus("");
          setAssetId("");
        });
      }
    } catch (error) {
      swal({
        title: "Error!",
        text: error.response.data.message || "Error adding asset.",
        icon: "error",
        buttons: "OK",
      });
    }
  };

  const handlePrevClick = () => {
    navigate("/Home"); // Navigate to the home page
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        marginTop: "5%",
      }}
    >
      <h1 style={{ fontWeight: "bold", fontFamily: "serif" }}>
        Add Assets<hr style={{ marginTop: "1px" }}></hr>
      </h1>

      <div style={{ width: "50%" }}>
        <TableContainer
          component={Paper}
          style={{ marginTop: "0px", maxHeight: "300px", overflowY: "auto" }}
        >
          <Table
            aria-label="asset table"
            style={{ backgroundColor: "transparent" }}
          >
            <TableHead>
              <TableRow>
                <TableCell
                  style={{
                    fontFamily: "sans-serif",
                    fontWeight: "bold",
                    backgroundColor: "gray",
                  }}
                >
                  S.No.
                </TableCell>
                <TableCell
                  style={{
                    fontFamily: "sans-serif",
                    fontWeight: "bold",
                    backgroundColor: "gray",
                  }}
                >
                  Name
                </TableCell>
                <TableCell
                  style={{
                    fontFamily: "sans-serif",
                    fontWeight: "bold",
                    backgroundColor: "gray",
                  }}
                >
                  Type
                </TableCell>
                <TableCell
                  style={{
                    fontFamily: "sans-serif",
                    fontWeight: "bold",
                    backgroundColor: "gray",
                  }}
                >
                  Status
                </TableCell>
                <TableCell
                  style={{
                    fontFamily: "sans-serif",
                    fontWeight: "bold",
                    backgroundColor: "gray",
                  }}
                >
                  ASSET_ID
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {assets.map((asset, index) => (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{asset.name}</TableCell>
                  <TableCell>{asset.type}</TableCell>
                  <TableCell>{asset.status}</TableCell>
                  <TableCell>{asset.ASSET_ID}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <div
          style={{
            marginTop: "20px",
            width: "100%",
            display: "flex",
            flexWrap: "wrap",
            gap: "10px",
          }}
        >
          <TextField
            label="Asset Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            error={nameError} // Set error state
            helperText={nameHelperText} // Show error message
            style={{
              flex: "1 1 calc(50% - 10px)",
              backgroundColor: "transparent",
            }}
          />
          <Select
            value={type}
            onChange={(e) => setType(e.target.value)}
            displayEmpty
            style={{
              flex: "1 1 calc(50% - 10px)",
              backgroundColor: "transparent",
            }}
          >
            <MenuItem value="" disabled>
              Select Type
            </MenuItem>
            <MenuItem value="Fixed">Fixed</MenuItem>
            <MenuItem value="Current">Current</MenuItem>
            <MenuItem value="Tangible">Tangible</MenuItem>
            <MenuItem value="Intangible">Intangible</MenuItem>
            <MenuItem value="Financial">Financial</MenuItem>
          </Select>
          <Select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            displayEmpty
            style={{
              flex: "1 1 calc(50% - 10px)",
              backgroundColor: "transparent",
            }}
          >
            <MenuItem value="" disabled>
              Select Status
            </MenuItem>
            <MenuItem value="Available">Available</MenuItem>
            <MenuItem value="In-use">In-use</MenuItem>
            <MenuItem value="Maintenance">Maintenance</MenuItem>
          </Select>
          <TextField
            label="Asset ID"
            value={ASSET_ID}
            onChange={(e) => setAssetId(e.target.value)}
            error={IdError} // Set error state
            helperText={IdHelperText} // Show error message
            style={{
              flex: "1 1 calc(50% - 10px)",
              backgroundColor: "transparent",
            }}
          />
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center", // Center align buttons horizontally
              gap: "10px",
            }}
          >
            <Button
              text="center"
              variant="contained"
              color="success"
              onClick={handleAddAsset}
              style={{ marginTop: "10px" }}
            >
              ADD
            </Button>

            <Button
              variant="contained"
              color="info"
              onClick={handlePrevClick}
              style={{ marginTop: "10px" }}
            >
              PREV
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssetTable;
