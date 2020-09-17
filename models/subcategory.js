import { Schema, model } from 'mongoose';

const subcategorySchema = new Schema({
    name: String,
    categoryId: {
        type: Schema.Types.ObjectID,
        ref: 'Category'
    },
    products: Array,
});

export default model('Subcategory', subcategorySchema);
