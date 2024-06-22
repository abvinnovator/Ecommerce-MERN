import express from 'express';
import { Product } from '../models/Products.js';
import { verifyUser } from './user.js';

const router = express.Router();

const verifyAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(403).json({ message: 'Access denied, admin only' });
  }
};

// Add product (admin only)
router.post('/add', verifyUser, verifyAdmin, async (req, res) => {
  try {
    const { name,description,price,discount,product_img_url } = req.body;
    const newProduct = new Product({
      name,
      description,
      price,
      discount,
      product_img_url
    });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: 'Error adding product', error });
  }
});

// Get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving products', error });
  }
});

export { router as ProductRouter };
