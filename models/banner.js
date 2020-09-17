import { Schema, model } from 'mongoose';

const bannerSchema = new Schema({
    title: String,
    description: String,
    image: String,
    toSlider: Boolean
});

export default model('Banner', bannerSchema);
