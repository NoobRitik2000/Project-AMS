import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.js";
import axios from "axios";
import swal from "sweetalert";
function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleLogin = async (e) => {
    e.preventDefault();

    // Check if email and password fields are empty
    if (!email || !password) {
      swal({
        title: "Error!",
        text: "Email and password are required.",
        icon: "warning",
        confirmButtonText: "OK",
      });
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/signin",
        {
          email,
          password,
        }
      );

      if (response.data.status === "success") {
        // Navigate to the home page if login is successful
        swal({
          title: "Success!",
          text: "Login successful!",
          icon: "success",
          button: "OK",
        }).then(() => {
          navigate("/home");
        });
      } else {
        // Show error if login failed
        swal({
          title: "Failed!",
          text: "Incorrect email or password. Please try again.",
          icon: "error",
          button: "OK",
        });
      }
    } catch (error) {
      console.error("Error during login:", error);
      swal({
        title: "Error!",
        text: "An error occurred during login.",
        icon: "error",
        button: "OK",
      });
    }
  };

  return (
    <>
      <div
        className="container  bg-transparent rounded-1  p-5 mx-auto "
        style={{
          width: "400px",
          height: "550px",
          border: "1px solid #000000",
          outline: "1px solid #000000",
          marginTop: "13%",
        }}
      >
        <div
          className="text-center mb-4 text-black bg-warning rounded-3 p-1"
          style={{
            fontFamily: "Montserrat",
            width: "102%",
            marginLeft: "-3px",
          }}
        >
          <h3>SignIn</h3>
        </div>
        <br></br>
        <div className="mb-4" id="LogIn">
          <input
            type="email"
            className="form-control"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: "102%", marginLeft: "-3px" }}
          />
        </div>
        <div className="form-group position-relative mb-4">
          <input
            type={showPassword ? "text" : "password"}
            className="form-control"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: "102%", marginLeft: "-3px" }}
          />
          <i
            className={`fa ${
              showPassword ? "fa-eye-slash" : "fa-eye"
            } password-toggle`}
            style={{ marginRight: "2%" }}
            onClick={togglePasswordVisibility}
          ></i>
        </div>
        <div className="text-center">
          <button
            type="submit"
            onClick={handleLogin}
            className="btn btn-primary"
          >
            LogIn
          </button>
        </div>
      </div>

      {/* </form> */}
    </>
  );
}

export default Login;
