import { Schema, model } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const productSchema = new Schema({
  name: String,
  description: String,
  oldPrice: Number,
  price: Number,
  images: {
    slider: Object,
    product: [Object]
  },
  color: String,
  available: Boolean,
  hot: Boolean,
  sale: Boolean,
  newItem: Boolean,
  toSlider: Boolean,
  createdAt: { type: Date, default: Date.now }
});

productSchema.plugin(mongoosePaginate);

export default model('Product', productSchema);
