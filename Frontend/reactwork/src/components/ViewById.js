import React, { useState } from "react";
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
} from "@mui/material";
import swal from "sweetalert";
import axios from "axios";

const ViewById = () => {
  const [searchId, setSearchId] = useState("");
  const [foundAsset, setFoundAsset] = useState(null);

  const handleSearch = async () => {
    try {
      // Correct API call using axios
      const response = await axios.get(`http://localhost:5000/api/getAsset/${searchId}`);
      setFoundAsset(response.data); // Set found asset from response
    } catch (error) {
      swal({
        title: "Error",
        text: "The given ID doesn't match any asset.",
        icon: "error",
        buttons: "ok",
      });
      setFoundAsset(null); // Clear found asset in case of error
    }
  };

  const handleClear = () => {
    setSearchId("");
    setFoundAsset(null); // Clear the table
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
        Search Asset by ID
        <hr style={{ marginTop: "1px" }} />
      </h1>

      <div
        style={{
          width: "50%",
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <TextField
          label="Enter Asset ID"
          variant="outlined"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
          fullWidth
        />
        <Button variant="contained" color="primary" onClick={handleSearch}>
          Search
        </Button>
        <Button variant="contained" color="secondary" onClick={handleClear}>
          Clear
        </Button>
      </div>

      {foundAsset && (
        <TableContainer
          component={Paper}
          style={{ marginTop: "20px", maxWidth: "50%" }}
        >
          <Table aria-label="asset table">
            <TableHead>
              <TableRow>
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
                >
                  Asset Name
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
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>{foundAsset.ASSET_ID}</TableCell> {/* Note: `_id` in MongoDB */}
                <TableCell>{foundAsset.name}</TableCell>
                <TableCell>{foundAsset.type}</TableCell>
                <TableCell>{foundAsset.status}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};

export default ViewById;
