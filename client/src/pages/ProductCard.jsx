import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { addToCartAsync } from './../redux/cartSlice';
import { Link } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const ProductCard = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3000/products/');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching the products', error);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (product) => {
    dispatch(addToCartAsync({
      productId: product._id, 
      quantity: 1, 
      name: product.name, 
      price: product.price, 
      image: product.image,
      description: product.description,
      category: product.category
    }));
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  // Calculate the products to be displayed on the current page
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-12 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-4">Explore our Products</h2>
        <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {currentProducts.map((product) => (
            <div key={product._id} className="group relative shadow-inner">
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                <img
                  src={product.product_img_url}
                  alt={product.name}
                  className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                />
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <Link to={`/product/${product._id}`}>
                    <h3 className="text-sm text-gray-700">
                      <a href={product.href}>
                        <span aria-hidden="true" className="absolute inset-0" />
                        {product.name}
                      </a>
                    </h3>
                  </Link>
                  <p className="mt-1 text-sm text-gray-500">{product.description}</p>
                  <Button 
                    onClick={() => handleAddToCart(product)} 
                    variant='outlined' 
                    color='secondary' 
                    size='small'
                  >
                    <p className="mt-1 text-sm text-black">ADD TO CART</p>
                  </Button>
                </div>
                <p className="text-sm font-medium text-gray-900">₹{parseFloat(product.price).toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>
        <div className=' ml-96'>
        <Stack spacing={2} className="mt-8">
          <Pagination 
            count={Math.ceil(products.length / productsPerPage)} 
            page={currentPage} 
            onChange={handlePageChange} 
            color="primary" 
          />
        </Stack>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
