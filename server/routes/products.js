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
    const { name,description,price,discount,product_img_url,category } = req.body;
    const newProduct = new Product({
      name,
      description,
      price,
      discount,
      product_img_url,
      category
    });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: 'Error adding product', error });
  }
});
//Get admin products
router.get('/getadminproducts', verifyUser, verifyAdmin, async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ message: 'Error getting products', error });
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

router.get('/category/:category', async (req, res) => {
  try {
    const { category } = req.params;
    const products = await Product.find({ category: category });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching category products', error: error.message });
  }
});
router.get("/product/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({
      product,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching product', error: error.message });
  }
});

export { router as ProductRouter };
