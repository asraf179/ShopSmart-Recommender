import axios from "axios";
import React, { useEffect, useState } from "react";
import { createContext } from "react";
import { useNavigate } from "react-router";
const AuthContext = createContext();
const AuthProvider = ({ children }) => {
  const [allProducts, setAllProducts] = useState([0]);
  const [user, setUser] = useState(null); // store username or user data
  //const [token, setToken] = useState(null); // store JWT token
  const [loading, setLoading] = useState(true);

  // Load token and user from localStorage on mount
  useEffect(() => {
    const token = localStorage.getItem("token");

    
    
    axios
      .get("http://127.0.0.1:8000/api/auth/verify_token/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.data.valid) {
          console.log("Token is valid for user:", res.data.user_id);
          setUser(res.data.user_id);
          setLoading(false);
           if(window.location.pathname !=="/")
       {
        window.location.href="/"
       }
        }
      })
      .catch((err) => {
        console.error("Token invalid or expired", err);
       if(window.location.pathname !=="/entry")
       {
        window.location.href="/entry"
       }
       setLoading(false)
      });
  }, []);

  // Register function
  const register = async (username, email, password) => {
    try {
      //console.log('yes')
      const res = await axios.post("http://127.0.0.1:8000/api/auth/register/", {
        username,
        email,
        password,
      });
      return { success: true, data: res.data };
    } catch (error) {
      return { success: false, error: error.response?.data || error.message };
    }
  };

  // Login function
  const login = async (identifier, password) => {
    try {
      const res = await axios.post("http://127.0.0.1:8000/api/auth/login/", {
        identifier,
        password,
      });
      if (res.data.token) {
        //setToken(res.data.token);
        setUser({ username: res.data.user.id });
        localStorage.setItem("token", res.data.token);
        localStorage.setItem(
          "user",
          JSON.stringify({ username: res.data.user })
        
        );
        
         
      }
      return { success: true, data: res.data };
    } catch (error) {
      return { success: false, error: error.response?.data || error.message };
    }
  };

  // Logout function
  const logout = () => {
    //setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
     if(window.location.pathname !=="/entry")
       {
        window.location.href="/entry"
       }
       setLoading(false)

  };

  // Axios instance with toke

  return (
    <div>
      <AuthContext.Provider
        value={{
          setAllProducts,
          allProducts,
          login,
          logout,
          register,
          user,
          setUser,
          loading,
          setLoading,
        }}
      >
        {children}
      </AuthContext.Provider>
    </div>
  );
};

export { AuthContext, AuthProvider };
