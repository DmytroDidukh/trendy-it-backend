import { Schema, model } from 'mongoose';

const productSchema = new Schema({
  name: String,
  description: String,
  oldPrice: Number,
  price: Number,
  images: {
    slider: Object,
    product: [Object]
  },
  colors: [String],
  available: Boolean,
  hot: Boolean,
  sale: Boolean,
  newItem: Boolean,
  toSlider: Boolean,
  createdAt: { type: Date, default: Date.now }
});

export default model('Product', productSchema);
