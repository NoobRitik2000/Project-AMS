import React, { useState } from "react";
import axios from "axios";
import swal from "sweetalert";
import "../App.css";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [usernameError, setUsernameError] = useState(""); // State for username error message
  const [emailError, setEmailError] = useState(""); // State for email error message
  const [passwordError, setPasswordError] = useState(""); // State for password error message
  const [inputError, setInputError] = useState(false); // State for input field error

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validateUsername = (username) => {
    // First letter uppercase, no spaces, no digits, no special characters
    const regex = /^[A-Z][A-Za-z]*$/;
    return regex.test(username);
  };

  const validateEmail = (email) => {
    // Email should not contain spaces, uppercase letters, or special characters (except '@')
    const regex = /^[a-z0-9._]+@[a-z0-9]+\.[a-z]{2,}$/;
    return regex.test(email);
  };

  const validatePassword = (password) => {
    // Password must contain letters, digits, special characters, and no spaces
    const regex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[\W_])(?!.*\s).+$/;
    return regex.test(password);
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    // Check if any field is empty
    if (!username || !email || !password) {
      swal({
        title: "Error!",
        text: "All fields are required.",
        icon: "warning",
        buttons: "OK",
      });
      return;
    }

    // Validate the username
    if (!validateUsername(username)) {
      setUsernameError(
        "Username must start with an uppercase letter, contain no spaces, digits, or special characters."
      );
      setInputError(true);
      return;
    } else {
      setUsernameError("");
      setInputError(false);
    }

    // Validate the email
    if (!validateEmail(email)) {
      setEmailError(
        "Email must be in lowercase, and contain no spaces or special characters (except '@')."
      );
      setInputError(true);
      return;
    } else {
      setEmailError("");
      setInputError(false);
    }

    // Validate the password
    if (!validatePassword(password)) {
      setPasswordError(
        "Password must contain letters, digits, special characters, and no spaces."
      );
      setInputError(true);
      return;
    } else {
      setPasswordError("");
      setInputError(false);
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/signup",
        {
          username,
          email,
          password,
        }
      );

      if (response.data.success) {
        swal({
          title: "Success!",
          text: "Registration successful!",
          icon: "success",
          buttons: "OK",
        });
        setUsername("");
        setEmail("");
        setPassword("");
      } else {
        swal({
          title: "Failed!",
          text: "Registration failed!",
          icon: "error",
          buttons: "OK",
        });
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "An error occurred during registration";

      swal({
        title: "Error!",
        text: errorMessage,
        icon: "error",
        buttons: "OK",
      });
    }
  };

  return (
    <div
      className="container bg-transparent rounded-1 p-5 mx-auto"
      style={{
        width: "400px",
        height: "550px",
        border: "1px solid #000000",
        outline: "1px solid #000000",
        marginTop: "13%",
      }}
    >
      <div className="container d-flex justify-content-center align-items-center">
        <div className="row justify-content-center align-items-center">
          <div className="col justify-content-center align-items-center">
            <div className="form-container box">
              <form onSubmit={handleRegister}>
                <div
                  className="text-center mb-4 text-black bg-warning rounded-3 p-1"
                  style={{
                    fontFamily: "Montserrat",
                    width: "135%",
                    marginLeft: "-40px",
                  }}
                >
                  <h3>SignUp</h3>
                </div>
                <br />
                <div className="mb-4">
                  <input
                    type="text"
                    className={`form-control ${
                      usernameError ? "is-invalid" : ""
                    }`} // Add 'is-invalid' class if there's an error
                    placeholder="Enter your name"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    style={{ width: "135%", marginLeft: "-40px" }}
                  />
                  {usernameError && (
                    <div
                      className="invalid-feedback"
                      style={{ marginLeft: "-40px", width: "135%" }}
                    >
                      {usernameError}
                    </div>
                  )}
                </div>
                <div className="mb-4">
                  <input
                    type="email"
                    className={`form-control ${emailError ? "is-invalid" : ""}`} // Add 'is-invalid' class if there's an error
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{ width: "135%", marginLeft: "-40px" }}
                  />
                  {emailError && (
                    <div
                      className="invalid-feedback"
                      style={{ marginLeft: "-40px", width: "135%" }}
                    >
                      {emailError}
                    </div>
                  )}
                </div>
                <div className="form-group position-relative mb-4">
                  <input
                    type={showPassword ? "text" : "password"}
                    className={`form-control ${
                      passwordError ? "is-invalid" : ""
                    }`} // Add 'is-invalid' class if there's an error
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{ width: "135%", marginLeft: "-40px" }}
                  />
                  {!passwordError && (
                    <i
                      className={`fa ${
                        showPassword ? "fa-eye-slash" : "fa-eye"
                      } password-toggle`}
                      style={{ marginRight: "-14%" }}
                      onClick={togglePasswordVisibility}
                    ></i>
                  )}
                  {passwordError && (
                    <div
                      className="invalid-feedback"
                      style={{ marginLeft: "-40px", width: "135%" }}
                    >
                      {passwordError}
                    </div>
                  )}
                </div>
                <div className="text-center">
                  <button type="submit" className="btn btn-primary">
                    Register
                  </button>
                </div>
                <br />
                <div className="mb-4 d-flex text-center gap-2">
                  <h6 style={{ color: "white", marginTop: "2px" }}>
                    Already have an account?
                  </h6>
                  <a href="/login">SignIn</a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
