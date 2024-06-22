import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  discount: { type: Number, required: true },
  product_img_url:{type:String,required:true}
});

const Product = mongoose.model('Product', productSchema);
export { Product };
