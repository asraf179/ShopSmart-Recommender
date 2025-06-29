import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthProvider/AuthProvider';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const { register } = useContext(AuthContext);

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errors, setErrors] = useState({});
  const[confirmPassword,setConfirmPassword]=useState('')
  const navigate = useNavigate();


  const validateForm = () => {
    let tempErrors = {};
    if (!username.trim()) tempErrors.username = 'Username is required';
    if (!email.trim()) {
      tempErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      tempErrors.email = 'Email is invalid';
    }
    if (!password.trim()) {
      tempErrors.password = 'Password is required';
    } else if (password.length < 6) {
      tempErrors.password = 'Password must be at least 6 characters';
    }
    if (password !== confirmPassword) {
      tempErrors.confirmPassword = 'Passwords do not match';
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('yes')
     const result = await register(username, email, password);
    if (result.success) {
      setSuccessMessage('Registration successful! Redirecting to login...');
      setError('');
      setTimeout(() => {
        navigate('/login'); // redirect after registration
      }, 2000);
    } else {
      setSuccessMessage('');
      setError(result.error?.error || 'Registration failed');
    }
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white/10 border border-gray-200 rounded-lg shadow-lg">
      <div className="flex justify-center space-x-4 mb-6 text-gray-500">
        <a href="/login" className="hover:text-cyan-700 text-orange-50">LOGIN</a>
        <span>|</span>
        <a href="/register" className="hover:text-cyan-700 text-orange-50 font-bold">REGISTER</a>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">
            Username *
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e)=>setUsername(e.target.value)}
            className={`w-full p-3 border rounded-md bg-gray-800 focus:outline-none focus:ring-2 ${
              errors.username ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
            }`}
            placeholder="Enter your username"
            required
          />
          {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username}</p>}
        </div>

        <div>
          <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
            Email address *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            className={`w-full p-3 border rounded-md bg-gray-800 focus:outline-none focus:ring-2 ${
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
            onChange={(e)=>setPassword(e.target.value)}
            className={`w-full p-3 border rounded-md bg-gray-800 focus:outline-none focus:ring-2 ${
              errors.password ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
            }`}
            placeholder="Enter your password"
            required
          />
          {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
        </div>

        <div>
          <label htmlFor="confirmPassword" className="block text-gray-700 text-sm font-bold mb-2">
            Confirm Password *
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e)=>setConfirmPassword(e.target.value)}
            className={`w-full p-3 border rounded-md bg-gray-800 focus:outline-none focus:ring-2 ${
              errors.confirmPassword ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
            }`}
            placeholder="Confirm your password"
            required
          />
          {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
        </div>

        <p className="text-sm text-gray-600">
          Your personal data will be used to support your experience throughout this website, to
          manage access to your account, and for other purposes described in our{' '}
          <a href="/privacy-policy" className="text-red-600 hover:underline">
            privacy policy
          </a>
          .
        </p>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition duration-200 disabled:bg-blue-400"
          disabled={Object.keys(errors).length > 0}
        >
          Register
        </button>
        {error && <p className="text-red-500 text-xs mt-2 text-center">{error}</p>}
          {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      </form>
    </div>
  );
};

export default Register;