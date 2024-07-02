import React from 'react'
import ProductCard from '../pages/ProductCard'
import Navbar from './Navbar'
import Footer from './Footer';

const Home = () => {
  return (
    <div>
        <Navbar />
        <ProductCard />
        <Footer />
    </div>
  )
}

export default Home