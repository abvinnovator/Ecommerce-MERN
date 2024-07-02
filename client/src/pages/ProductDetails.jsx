import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { addToCartAsync } from './../redux/cartSlice';
import Navbar from '../components/Navbar';

const ProductDetails = () => {
  const [product, setProduct] = useState(null);
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/products/product/${id}`);
        setProduct(response.data.product);
      } catch (error) {
        console.error('Error fetching the product', error);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCartAsync({
        productId: product._id,
        quantity: 1,
        name: product.name,
        price: product.price,
        image: product.product_img_url,
        description: product.description,
        category: product.category
      }));
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <>
    <Navbar />
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/2">
          <img
            src={product.product_img_url}
            alt={product.name}
            className="w-full h-auto object-cover rounded-lg shadow-lg"
          />
        </div>
        <div className="md:w-1/2 md:pl-8 mt-4 md:mt-0">
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-xl font-semibold mb-4">₹{parseFloat(product.price).toFixed(2)}</p>
          <p className="text-gray-600 mb-4">{product.description}</p>
          <p className="text-sm text-gray-500 mb-4">Category: {product.category}</p>
          <Button
            onClick={handleAddToCart}
            variant="contained"
            color="primary"
            size="large"
            className="w-full md:w-auto"
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
    </>
  );
};

export default ProductDetails;