import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthProvider/AuthProvider';

const Login = () => {

  const { login } = useContext(AuthContext);
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [errors,setErrors]=useState({})
  const navigate = useNavigate();

  const validateForm = () => {
    let tempErrors = {};
    if (!identifier.trim()) {
      tempErrors.email = 'identifier is required';
    } 
    
    if (!password.trim()) {
      tempErrors.password = 'Password is required';
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
       const result = await login(identifier, password);
    if (result.success) {
      console.log("Login successful!");
      navigate('/'); // redirect to home or dashboard
    } else {
      setError(result.error?.error || "Login failed");
    }
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white/10 backdrop-blur-md border border-white/30 rounded-lg shadow-lg mt-11 text-white">
      <div className="flex justify-center space-x-4 mb-6 text-gray-500">
        <a href="/login" className="hover:text-cyan-700 text-orange-50 font-semibold">LOGIN</a>
        <span>|</span>
        <a href="/register" className="hover:text-cyan-700 text-orange-50">REGISTER</a>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
            Email address *
          </label>
          <input
            type="email"
            id="email"
            name="email"
           value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
            className={`w-full p-3 border rounded-md bg-gray-50 focus:outline-none focus:ring-2 ${
              errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
            }`}
            placeholder="Enter your email"
            required
          />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
        </div>

        <div>
          <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
            Password *
          </label>
          <input
            type="password"
            id="password"
            name="password"
           value={password}
           onChange={(e) => setPassword(e.target.value)}
            className={`w-full p-3 border rounded-md bg-gray-50 focus:outline-none focus:ring-2 ${
              errors.password ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
            }`}
            placeholder="Enter your password"
            required
          />
          {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
        </div>

        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center text-gray-600">
            <input type="checkbox" className="mr-2 text-blue-600 focus:ring-blue-500" />
            Remember me
          </label>
          <a href="/forgot-password" className="text-red-600 hover:underline">
            Lost your password?
          </a>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition duration-200 disabled:bg-blue-400"
          disabled={Object.keys(errors).length > 0}
        >
          Login
        </button>
        {error && <p className="text-red-500 text-xs mt-2 text-center">{error}</p>}
      </form>
    </div>
  );

};
export default Login;