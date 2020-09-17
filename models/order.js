import {Schema, model} from 'mongoose';

const orderSchema = new Schema({
    customer: {
        name: String,
        surname: String,
        email: String,
        phone: String,
    },
    delivery: {
        method: String,
        city: String,
        postOffice: String,
        address: {
            street: String,
            built: String,
            apartment: String,
        }
    },
    products: [Object],
    connectionMethod: String,
    orderId: String,
    createdAt: { type: Date, default: Date.now },
    status: {type: String, default: 'processing'}
});

export default model('Order', orderSchema);
