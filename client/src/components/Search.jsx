import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Search = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState({});
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef(null);

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

    // Close search results when clicking outside
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    setShowResults(true);

    if (term.length > 0) {
      const results = products.filter(product => 
        product.name.toLowerCase().includes(term) || 
        product.category.toLowerCase().includes(term)
      );

      const groupedResults = results.reduce((acc, product) => {
        if (!acc[product.category]) {
          acc[product.category] = [];
        }
        acc[product.category].push(product);
        return acc;
      }, {});

      setSearchResults(groupedResults);
    } else {
      setSearchResults({});
    }
  };

  return (
    <div ref={searchRef} className="relative xl:w-96 max-lg:w-full lg:ml-10 max-md:mt-4 max-lg:ml-4">
      <input 
        type='text' 
        placeholder='Search Products...' 
        className='w-full bg-gray-100 focus:bg-transparent pl-10 pr-6 rounded h-11 outline-[#333] text-sm transition-all'
        value={searchTerm}
        onChange={handleSearch}
      />
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute left-3 top-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>

      {showResults && Object.keys(searchResults).length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg">
          {Object.entries(searchResults).map(([category, products]) => (
            <div key={category} className="p-2">
              <h3 className="text-sm font-semibold text-gray-700">{category}</h3>
              <ul>
                {products.slice(0, 3).map(product => (
                  <li key={product._id} className="py-1">
                    <Link to={`/product/${product._id}`} className="text-sm text-gray-600 hover:text-gray-900">
                      {product.name}
                    </Link>
                  </li>
                ))}
                {products.length > 3 && (
                  <li className="py-1">
                    <Link to={`/category/${category}`} className="text-xs text-blue-600 hover:text-blue-800">
                      View all in {category}
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;