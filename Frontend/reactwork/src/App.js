import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home.js";
import Login from "./components/Login.js";
import Register from "./components/Register.js";
import AddAsset from "./components/AddAsset.js";
import AssetTable from "./components/AssetTable.js";
import ViewAsset from "./components/ViewAsset.js";
import EditAsset from "./components/EditAsset.js";
import AssignAsset from "./components/AssignAsset.js";
import ViewById from "./components/ViewById.js";

import Logout from "./components/Logout.js";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/AddAsset" element={<AddAsset />} />
          <Route path="/AssetTable" element={<AssetTable />} />
          <Route path="/ViewAsset" element={<ViewAsset/>} />
          <Route  path="/EditAsset" element={<EditAsset />} />
          <Route path="/AssignAsset" element={<AssignAsset/>}/>
          <Route path="/ViewById" element={<ViewById />} />

          <Route path="/Logout" element={<Logout/>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
