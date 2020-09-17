import {Product} from '../../models';

class ProductService {
    getProducts() {
        return Product.find();
    }

    getProductById(id) {
        return Product.findById(id);
    }

    getProductBySubcategoryId(id) {
        return Product.find({subcategoryId: id})
    }

    getProductByCategoryId(id) {
        return Product.find({categoryId: id})
    }

    addProduct(data) {
        const product = new Product(data);
        return product.save();
    }

    updateProduct({id, product}) {
        return Product.findByIdAndUpdate(
            id,
            {$set: {...product}},
            {new: true}
        );
    }

    deleteProduct(id) {
        return Product.findByIdAndRemove(id)
    }

    updateProductRating({id, rate}) {
        return Product.findOneAndUpdate(
            {_id: id},
            {$push: {rating: {value: rate}}},
            {returnOriginal: false},
            (err, item) => console.log(item, err)
        );
    }
}

export default new ProductService();
