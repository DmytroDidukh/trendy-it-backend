import {Schema, model} from 'mongoose';

const categorySchema = new Schema({
    name: String,
    image: String,
    subcategories: Array,
    products: Array,
});

export default model('Category', categorySchema);
