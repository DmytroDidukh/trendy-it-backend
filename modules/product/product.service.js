import {Product} from '../../models';
import ImagesService from '../images/images.service';

class ProductService {
    async getProducts() {
        const sort = {
            createdAt: -1
        }

        const page = 1


        const options = {
            page: page,
            limit: 5,
            sort: sort
        };

        const colors = [{red: true}]
        /*    colors: { $all: [
                    { "$elemMatch" : { size: "M", num: { $gt: 50} } },
                    { "$elemMatch" : { num : 100, color: "green" } }
                ] }*/
        const filters = {
            /*    price: {
                    $gte: 50,
                    $lte: 500,
                },
                name: {$regex: new RegExp('test', 'i')},*/

             colors: {
                 red: true
             }

        }

        const products = Product.paginate(filters, options, (err, result) => {
            console.log(result)
            return result.docs
        })

        return products

    }

    getProductById(id) {
        return Product.findById(id);
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

    async deleteProduct(id) {
        const currentProduct = await this.getProductById(id);
        const {images} = currentProduct;

        const imagesToDelete = [
            images.slider,
            ...Object.values(images.product).map((img) => img.publicId)
        ].filter((val) => val);

        await ImagesService.deleteImages(imagesToDelete);

        return Product.findByIdAndRemove(id);
    }
}

export default new ProductService();

