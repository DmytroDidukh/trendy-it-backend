import { Schema, model } from 'mongoose';

const productSchema = new Schema({
    name: String,
    description: String,
    oldPrice: Number,
    price: Number,
    images: {
        slider: String,
        product: [Object]
    },
    colors: {
        type: Object,
        default: {
            black: false,
            silver: false,
            white: false,
            red: false,
            yellow: false,
            orange: false,
            blue: false,
            green: false,
            purple: false,
            pink: false,
            brown: false,
        }
    },
    available: Boolean,
    hot: Boolean,
    sale: Boolean,
    newItem: Boolean,
    toSlider: Boolean,
    createdAt: { type: Date, default: Date.now },
});

export default model('Product', productSchema);
