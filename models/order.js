import { Schema, model } from 'mongoose';
import mongoosePaginate from "mongoose-paginate-v2";

const orderSchema = new Schema({
  customer: {
    name: String,
    surname: String,
    email: String,
    phone: String
  },
  delivery: {
    method: String,
    city: String,
    postOffice: String,
    address: {
      street: String,
      built: String,
      apartment: String
    }
  },
  products: [Object],
  deliveryPrice: { type: Number, default: 0 },
  connectionMethod: String,
  paymentMethod: String,
  orderId: String,
  createdAt: { type: Date, default: Date.now },
  status: { type: String, default: 'processing' }
});

orderSchema.plugin(mongoosePaginate);

export default model('Order', orderSchema);
