// src/redux/cartSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { addToCartAPI, removeFromCartAPI, fetchCartAPI } from './CartAPI';


export const addToCartAsync = createAsyncThunk(
  'cart/addToCartAsync',
  async ({ productId, quantity }, { rejectWithValue }) => {
    try {
      const response = await addToCartAPI(productId, quantity);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const removeFromCartAsync = createAsyncThunk(
  'cart/removeFromCartAsync',
  async (productId, { rejectWithValue }) => {
    try {
      const response = await removeFromCartAPI(productId);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchCartAsync = createAsyncThunk(
  'cart/fetchCartAsync',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchCartAPI();
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    totalQuantity: 0,
    status: 'idle',
    error: null,
  },
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.items.find(item => item.productId === action.payload.productId);
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
      state.totalQuantity += action.payload.quantity;
    },
    removeFromCart: (state, action) => {
      const index = state.items.findIndex(item => item.productId === action.payload);
      if (index !== -1) {
        state.totalQuantity -= state.items[index].quantity;
        state.items.splice(index, 1);
      }
    },
    decrementQuantity: (state, action) => {
      const existingItem = state.items.find(item => item.productId === action.payload);
      if (existingItem) {
        if (existingItem.quantity > 1) {
          existingItem.quantity -= 1;
          state.totalQuantity -= 1;
        } else {
          state.totalQuantity -= existingItem.quantity;
          state.items = state.items.filter(item => item.productId !== action.payload);
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToCartAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addToCartAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload.products.map(product => ({
          ...product,
          productId: product.productId._id,
          name: product.productId.name,
          price: product.productId.price,
          description: product.productId.description,
          image: product.productId.product_img_url
        }));
        state.totalQuantity = state.items.reduce((total, item) => total + item.quantity, 0);
      })
      .addCase(addToCartAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(removeFromCartAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload.products.map(product => ({
          ...product,
          productId: product.productId._id,
          name: product.productId.name,
          price: product.productId.price,
          description: product.productId.description,
          image: product.productId.product_img_url
        }));
        state.totalQuantity = state.items.reduce((total, item) => total + item.quantity, 0);
      })
      .addCase(fetchCartAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload.products.map(product => ({
          ...product,
          productId: product.productId._id,
          name: product.productId.name,
          price: product.productId.price,
          description: product.productId.description,
          image: product.productId.product_img_url
        }));
        state.totalQuantity = state.items.reduce((total, item) => total + item.quantity, 0);
      });
  },
});
export const { addToCart, removeFromCart, decrementQuantity } = cartSlice.actions;
export default cartSlice.reducer;