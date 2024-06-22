import express from 'express';
import { Cart } from '../models/Cart.js';
import { verifyUser } from './user.js';
import { User } from '../models/User.js';

const router = express.Router();

router.post('/addtocart', verifyUser, async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const user = await User.findOne({ username: req.user.username }, '-password');
   
    console.log('User ID:', user._id);
    console.log('Product ID:', productId);
    console.log('Quantity:', quantity);
    if (!user._id) {
      return res.status(400).json({ error: 'User ID is missing' });
    }

    if (!productId) {
      return res.status(400).json({ error: 'Product ID is missing' });
    }
    const userId = user._id
    let cart = await Cart.findOne({ userId });
    
    if (cart) {
      const productIndex = cart.products.findIndex(p => p.productId.toString() === productId);
      if (productIndex > -1) {
        cart.products[productIndex].quantity += quantity;
      } else {
        cart.products.push({ productId, quantity });
      }
    } else {
      cart = new Cart({ userId, products: [{ productId, quantity }] });
    }

    await cart.save();
    res.status(200).json(cart);
  } catch (err) {
    console.error('Error in /addtocart:', err);
    res.status(500).json({ error: err.message, stack: err.stack });
  }
});

router.post('/removecart', verifyUser, async (req, res) => {
  try {
    const { productId } = req.body;
    const user = await User.findOne({ username: req.user.username }, '-password');
    const userId = user._id;
  

    const cart = await Cart.findOne({ userId });
    if (cart) {
      cart.products = cart.products.filter(p => p.productId.toString() !== productId);
      await cart.save();
      res.status(200).json(cart);
    } else {
      res.status(404).json({ message: 'Cart not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/showcart', verifyUser, async (req, res) => {
  try {
    const user = await User.findOne({ username: req.user.username }, '-password');
    const userId = user._id;
    const cart = await Cart.findOne({ userId }).populate('products.productId');
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


export {router as CartRouter};
