import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthProvider/AuthProvider";

const SignUpForm = ({ onSwitch }) => {
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const validateForm = () => {
    let tempErrors = {};
    if (!username.trim()) tempErrors.username = "Username is required";
    if (!email.trim()) {
      tempErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      tempErrors.email = "Email is invalid";
    }
    if (!password.trim()) {
      tempErrors.password = "Password is required";
    } else if (password.length < 6) {
      tempErrors.password = "Password must be at least 6 characters";
    }
    if (password !== confirmPassword) {
      tempErrors.confirmPassword = "Passwords do not match";
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const result = await register(username, email, password);
    if (result.success) {
      setSuccessMessage("Registration successful! Redirecting to login...");
      setError("");
      setTimeout(() => navigate("/entry"), 2000);
    } else {
      setSuccessMessage("");
      setError(result.error?.error || "Registration failed");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-black bg-opacity-60 p-8 rounded w-full max-w-md text-white"
    >
      <h2 className="text-3xl font-bold mb-6">Create Your Account</h2>

      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className={`w-full p-3 mb-2 rounded bg-gray-800 text-white border ${
          errors.username ? "border-red-500" : "border-transparent"
        }`}
      />
      {errors.username && (
        <p className="text-red-400 text-xs mb-2">{errors.username}</p>
      )}

      <input
        type="email"
        placeholder="Email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className={`w-full p-3 mb-2 rounded bg-gray-800 text-white border ${
          errors.email ? "border-red-500" : "border-transparent"
        }`}
      />
      {errors.email && (
        <p className="text-red-400 text-xs mb-2">{errors.email}</p>
      )}

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className={`w-full p-3 mb-2 rounded bg-gray-800 text-white border ${
          errors.password ? "border-red-500" : "border-transparent"
        }`}
      />
      {errors.password && (
        <p className="text-red-400 text-xs mb-2">{errors.password}</p>
      )}

      <input
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        className={`w-full p-3 mb-2 rounded bg-gray-800 text-white border ${
          errors.confirmPassword ? "border-red-500" : "border-transparent"
        }`}
      />
      {errors.confirmPassword && (
        <p className="text-red-400 text-xs mb-2">{errors.confirmPassword}</p>
      )}

      <button
        type="submit"
        className="w-full bg-red-600 text-white py-3 rounded hover:bg-red-700 mb-4"
      >
        Sign Up
      </button>

      {error && <p className="text-red-400 text-sm text-center mb-2">{error}</p>}
      {successMessage && (
        <p className="text-green-400 text-sm text-center mb-2">
          {successMessage}
        </p>
      )}

      <p className="text-sm text-center">
        Already have an account?{" "}
        <span onClick={onSwitch} className="underline cursor-pointer">
          Sign in
        </span>
      </p>
    </form>
  );
};

export default SignUpForm;
