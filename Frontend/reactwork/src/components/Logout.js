import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // LocalStorage se user ke data ko clear karna (Optional)
    localStorage.removeItem("user");

    // Aapki application ke according necessary clean-up code yahan add kar sakte hain.

    // Redirect user to the Register page
    navigate("/");
  }, [navigate]);

  return null; // Ye component UI par kuch display nahi karega
};

export default Logout;
