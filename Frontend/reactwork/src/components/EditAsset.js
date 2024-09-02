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
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AssetTable = () => {
  const [assets, setAssets] = useState([]);
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [status, setStatus] = useState("");
  const [nameError, setNameError] = useState(false);
  const [nameHelperText, setNameHelperText] = useState("");
  const [ASSET_ID, setAssetId] = useState("");
  const [IdError, setIdError] = useState(false); // State for name error
  const [IdHelperText, setIdHelperText] = useState("");
  const [editingAsset, setEditingAsset] = useState(null);
  const [editName, setEditName] = useState("");
  const [editType, setEditType] = useState("");
  const [editStatus, setEditStatus] = useState("");

  const navigate = useNavigate();
  useEffect(() => {
    const storedAssets = JSON.parse(localStorage.getItem("assets"));
    if (storedAssets) {
      setAssets(storedAssets);

    }
  }, []);




  const validateName = (name) => /^[A-Za-z\s]+$/.test(name);
  const validateId = (ASSET_ID) => {
    const idRegex = /^[0-9]+$/;
    return idRegex.test(ASSET_ID);
  };
  const handleAddAsset = async (e) => {
    e.preventDefault();

    if (!name || !type || !status|| !ASSET_ID ) {
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
        "http://localhost:5000/api/assets/addAsset", // Use POST for adding new asset
        { name, type, status,ASSET_ID }
      );

      if (response.data) {
        const updatedAssets = [...assets, response.data];
        setAssets(updatedAssets);
        localStorage.setItem("assets", JSON.stringify(updatedAssets));
        swal({
          title: "Success!",
          text: "Asset added successfully!",
          icon: "success",
          buttons: "OK",
        }).then(() => {
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
  const handleEditClick = (asset) => {
    setEditingAsset(asset);
    setEditName(asset.name);
    setEditType(asset.type);
    setEditStatus(asset.status);
  };

  const handleUpdateAsset = async (e) => {
    e.preventDefault();
    console.log('Editing Asset:', editingAsset); // Debugging line
    if (!editingAsset?._id) {
      console.error("Asset ID is undefined! Cannot update.");
      return;
    }

    if (!editName || !editType || !editStatus) {
      swal({
        title: "Error!",
        text: "All fields are required.",
        icon: "warning",
        buttons: "OK",
      });
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:5000/api/assets/updateAsset/${editingAsset._id}`, // Correct URL
        { name: editName, type: editType, status: editStatus }
      );

      if (response.data) {
        const updatedAssets = assets.map((asset) =>
          asset._id === editingAsset._id
            ? { ...asset, name: editName, type: editType, status: editStatus }
            : asset
        );

        setAssets(updatedAssets);
        localStorage.setItem("assets", JSON.stringify(updatedAssets));
        swal({
          title: "Success!",
          text: "Asset updated successfully!",
          icon: "success",
          buttons: "OK",
        }).then(() => {
          setEditingAsset(null);
          setEditName("");
          setEditType("");
          setEditStatus("");
        });
      }
    } catch (error) {

      swal({


        title: "Error!",
        text: error.response.data.message || "Error updating asset.",
        icon: "error",
        buttons: "OK",
      });
    }
  };

  const handleDeleteClick = async (asset) => {
    console.log('Asset to delete:', asset); // Debugging line
    if (!asset?._id) {
      console.error("Asset ID is undefined! Cannot delete.");
      return;
    }
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this asset!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        try {
          await axios.delete(`http://localhost:5000/api/assets/deleteAsset/${asset._id}`);

          const updatedAssets = assets.filter((a) => a._id !== asset._id);
          setAssets(updatedAssets);

          localStorage.setItem("assets", JSON.stringify(updatedAssets));

          swal("Asset has been deleted!", {
            icon: "success",
          });
        } catch (error) {
          const errorMessage = error.response?.data?.message || "Error deleting asset";
          swal({

            title: "Error!",
            text: errorMessage,
            icon: "error",
            buttons: "OK",
          });
        }
      }
    });
  };

  return (
    <>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
          marginTop: "8%",
        }}
      >
        <div style={{ width: "50%" }}>
          <Button
            variant="contained"
            color="info"
            onClick={handlePrevClick}
          >
            Home
          </Button>
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
                  <TableCell
                    style={{
                      fontFamily: "sans-serif",
                      fontWeight: "bold",
                      backgroundColor: "gray",
                    }}
                    colSpan={2}
                  >
                    Action Buttons
                  </TableCell>
                
                </TableRow>
              </TableHead>
              <TableBody>
                {assets.map((asset, index) => (
                  <TableRow key={asset._id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{asset.name}</TableCell>
                    <TableCell>{asset.type}</TableCell>
                    <TableCell>{asset.status}</TableCell>
                    <TableCell>{asset.ASSET_ID}</TableCell>
                    <div className="d-flex ">
                    <TableCell>
                     
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleEditClick(asset)}
                      >
                        Edit
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="warning"
                        onClick={() => handleDeleteClick(asset)}
                        style={{marginLeft:"-1rem"}}
                      >
                        Delete
                      </Button>
                    </TableCell>
                      </div>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {editingAsset && (
            <div style={{ marginTop: "20px" }}>
              <h2>Edit Asset</h2>
              <form onSubmit={handleUpdateAsset}>
                <div className="d-flex gap-4">
                  <TextField
                    label="Asset Name"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    style={{ marginBottom: "10px" }}
                  />
                  <Select
                    value={editType}
                    onChange={(e) => setEditType(e.target.value)}
                    displayEmpty
                    style={{ marginBottom: "10px" }}
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
                    value={editStatus}
                    onChange={(e) => setEditStatus(e.target.value)}
                    displayEmpty
                    style={{ marginBottom: "10px" }}
                  >
                    <MenuItem value="" disabled>
                      Select Status
                    </MenuItem>
                    <MenuItem value="Available">Available</MenuItem>
                    <MenuItem value="In-use">In-use</MenuItem>
                    <MenuItem value="Maintenance">Maintenance</MenuItem>
                  </Select>
                </div>
                <div className="d-flex gap-2">
                  <Button type="submit" variant="contained" color="success">
                    Update
                  </Button>
                  <Button
                    onClick={() => setEditingAsset(null)}
                    variant="contained"
                    color="warning"
                    style={{ marginLeft: "10px" }}
                  >
                    Cancel
                  </Button>

                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AssetTable;
