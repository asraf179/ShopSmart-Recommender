import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthProvider/AuthProvider";

const SignInForm = ({ onSwitch }) => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [error, setError] = useState("");

  const validateForm = () => {
    let tempErrors = {};
    if (!identifier.trim()) tempErrors.email = "Email is required";
    if (!password.trim()) tempErrors.password = "Password is required";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const result = await login(identifier, password);
    if (result.success) {
      navigate("/"); // redirect to home
    } else {
      setError(result.error?.error || "Login failed");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-black/20 bg-opacity-90 backdrop-blur-md p-16 rounded-lg w-full max-w-md border-white/10"
    >
      <h2 className="text-3xl font-bold mb-6">Sign In</h2>

      <input
        type="text"
        autoComplete="username"
        placeholder="Email or mobile number"
        value={identifier}
        onChange={(e) => setIdentifier(e.target.value)}
        className={`w-full mb-3 p-3 rounded bg-gray-800 text-white border ${
          errors.email ? "border-red-500" : "border-transparent"
        }`}
      />
      {errors.email && (
        <p className="text-red-400 text-xs mb-4">{errors.email}</p>
      )}

      <div className="relative mb-7">
        <input
          type={showPassword ? "text" : "password"}
          autoComplete="current-password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={`w-full p-3 pr-10 rounded bg-gray-800 text-white border ${
            errors.password ? "border-red-500" : "border-transparent"
          }`}
        />
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-3 top-3 text-sm text-gray-300"
        >
          {showPassword ? "Hide" : "Show"}
        </button>
      </div>
      {errors.password && (
        <p className="text-red-400 text-xs mb-2">{errors.password}</p>
      )}

      <button
        type="submit"
        className="w-full bg-red-600 text-white py-3 rounded hover:bg-red-700 mb-4"
      >
        Sign In
      </button>

      <div className="flex justify-between items-center text-sm mb-4">
        <label>
          <input type="checkbox" className="mr-2" />
          Remember me
        </label>
        <a href="#" className="underline">
          Forgot password?
        </a>
      </div>

      {error && <p className="text-red-400 text-sm text-center mb-4">{error}</p>}

      <p className="text-sm text-center">
        New to Bakola?{" "}
        <span onClick={onSwitch} className="underline cursor-pointer">
          Sign up now.
        </span>
      </p>
    </form>
  );
};

export default SignInForm;
