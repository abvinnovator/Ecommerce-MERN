import React, { useState } from "react";
import Axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
 

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:3000/auth/signup", {
      username,
      email,
      password,
      
    }).then(response => {
        if(response.data.status) {
          if (response.data.isAdmin) {
            navigate('/admin');
          } else {
            navigate('/login');
          }
        }
      
    }).catch(err => {
        console.log(err);
    });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form className="bg-white p-8 rounded-lg shadow-md w-full max-w-md" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-700">Username:</label>
          <input
            type="text"
            id="username"
            placeholder="Username"
            className="w-full px-3 py-2 border border-gray-300 rounded mt-1"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700">Email:</label>
          <input
            type="email"
            id="email"
            autoComplete="off"
            placeholder="Email"
            className="w-full px-3 py-2 border border-gray-300 rounded mt-1"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700">Password:</label>
          <input
            type="password"
            id="password"
            placeholder="******"
            className="w-full px-3 py-2 border border-gray-300 rounded mt-1"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">Sign Up</button>
        <div className="flex justify-between items-center mt-4">
          <p>Have an Account? <Link to="/login" className="text-blue-500">Login</Link></p>
        </div>
      </form>
    </div>
  );
};

export default Signup;