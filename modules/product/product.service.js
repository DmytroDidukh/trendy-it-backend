import {Product} from '../../models';
import ImagesService from '../images/images.service';

class ProductService {
    async getProducts({filter, sort, page, limit}) {
        const query = this.filterProducts(filter);
        const options = {
            page: parseInt(page, 10) || 1,
            limit: parseInt(limit, 10) || 12,
            sort: sort
        };

        return await Product.paginate(query, options, (err, result) => ({
            products: result.docs,
            pagination: {
                totalDocs: result.totalDocs,
                currentPage: result.page,
                totalPages: result.totalPages,
                hasPrevPage: result.hasPrevPage,
                hasNextPage: result.hasNextPage
            }
        }));
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

    filterProducts(args = {}) {
        const {colors, priceRange, search, hot, available, newItem, sale, toSlider, isHomeQuery} = args;

        if (isHomeQuery) {
            return {available: true, $or: [{hot: true}, {toSlider: true}]}
        }

        const query = {};

        if (hot) {
            query.hot = hot;
        }

        if (toSlider) {
            query.toSlider = toSlider;
        }

        if (available) {
            query.available = available;
        }

        if (newItem) {
            query.newItem = newItem;
        }

        if (sale) {
            query.sale = sale;
        }

        if (colors && colors.length) {
            query.colors = {
                $elemMatch: {$in: colors}
            };
        }

        if (priceRange && priceRange.length) {
            query.price = {
                $gte: priceRange[0],
                $lte: priceRange[1]
            };
        }

        if (!(!search || search.trim().length === 0)) {
            query.$or = [
                {
                    name: {$regex: new RegExp(search, 'i')}
                },
                {
                    description: {
                        $regex: new RegExp(search, 'i')
                    }
                }
            ];
        }

        return query;
    }
}

export default new ProductService();
