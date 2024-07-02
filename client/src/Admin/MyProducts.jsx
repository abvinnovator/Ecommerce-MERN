import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MyProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:3000/products/getadminproducts', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        
        setProducts(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch products: ' + err.message);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error) return <div className="text-center py-10 text-red-600">{error}</div>;

  if (products.length === 0) {
    return <div className="text-center py-10">No products added by you yet.</div>;
  }

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Admin Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <img src={product.product_img_url} alt={product.name} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2 text-gray-800">{product.name}</h2>
              <p className="text-gray-600 mb-2 line-clamp-2">{product.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold text-amazon-orange">${product.price.toFixed(2)}</span>
                <span className="text-sm text-gray-500">Discount: {product.discount}%</span>
              </div>
              <div className="mt-4 flex justify-between">
                <button className="bg-amazon-blue text-white px-4 py-2 rounded hover:bg-amazon-blue-dark transition-colors duration-300">
                  Edit
                </button>
                <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors duration-300">
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyProducts;