import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Admin = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setProfile(null);
    } else {
      axios.get("http://localhost:3000/auth/userprofile", { withCredentials: true })
        .then((res) => {
          if (res.data.status === false && res.data.message === "no token") {
            setProfile(null);
          } else {
            setProfile(res.data);
          }
        })
        .catch((err) => {
          console.log(err);
          setProfile(null);
        });
    }
  }, []);

  if (!profile || !profile.isAdmin) {
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
        <p className="text-sm">You do not have permission to access this page.</p>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded mt-4 hover:bg-blue-600"
          onClick={() => navigate('/')}
        >
          Go Back
        </button>
      </div>
    );
  }

  const handleMyProfileClick = () => {
    navigate('/my-profile');
  };

  const handleAddProductClick = () => {
    navigate('/add-product');
  };

  const handleMyProductsClick = () => {
    navigate('/my-products');
  };

  const handleEarningsClick = () => {
    navigate('/earnings');
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <div
          className="bg-blue-500 text-white p-4 rounded cursor-pointer hover:bg-blue-600"
          onClick={handleMyProfileClick}
        >
          <div className="flex items-center mb-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h2 className="text-lg font-semibold">My Profile</h2>
          </div>
          <p className="text-sm">View and edit your profile information.</p>
        </div>
        <div
          className="bg-green-500 text-white p-4 rounded cursor-pointer hover:bg-green-600"
          onClick={handleAddProductClick}
        >
          <div className="flex items-center mb-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            <h2 className="text-lg font-semibold">Add Product</h2>
          </div>
          <p className="text-sm">Add a new product to the marketplace.</p>
        </div>
        <div
          className="bg-yellow-500 text-white p-4 rounded cursor-pointer hover:bg-yellow-600"
          onClick={handleMyProductsClick}
        >
          <div className="flex items-center mb-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
              />
            </svg>
            <h2 className="text-lg font-semibold">My Products</h2>
          </div>
          <p className="text-sm">View and manage your products.</p>
        </div>
        <div
          className="bg-red-500 text-white p-4 rounded cursor-pointer hover:bg-red-600"
          onClick={handleEarningsClick}
        >
          <div className="flex items-center mb-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h2 className="text-lg font-semibold">Your Earnings</h2>
          </div>
          <p className="text-sm">View your earnings from product sales.</p>
        </div>
      </div>
    </div>
  );
};

export default Admin;
