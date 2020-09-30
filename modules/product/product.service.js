import { Product } from '../../models';
import ImagesService from '../images/images.service';

class ProductService {
  async getProducts({ filter, sort, page }) {
    const query = this.filterItems(filter);
    const options = {
      page: parseInt(page, 10) || 1,
      limit: 10,
      sort: sort
    };

    return await Product.paginate(query, options, (err, result) => ({
      products: result.docs,
      pagination: {
        totalDocs: result.totalDocs,
        totalPages: result.totalPages,
        hasPrevPage: result.hasPrevPage,
        hasNextPage: result.hasNextPage
      }
    }));
  }

  filterItems(args = {}) {
    const { colors, priceRange, search, hot, available, newItem, sale } = args;

    const filter = {};

    if (hot) {
      filter.hot = hot;
    }

    if (available) {
      filter.available = available;
    }

    if (newItem) {
      filter.newItem = newItem;
    }

    if (sale) {
      filter.sale = sale;
    }

    if (colors && colors.length) {
      filter.colors = {
        $elemMatch: { $in: colors }
      };
    }

    if (priceRange && priceRange.length) {
      filter.price = {
        $gte: priceRange[0],
        $lte: priceRange[1]
      };
    }

    if (!(!search || search.trim().length === 0)) {
      filter.$or = [
        {
          name: { $regex: new RegExp(search, 'i') }
        },
        {
          description: {
            $regex: new RegExp(search, 'i')
          }
        }
      ];
    }

    return filter;
  }

  getProductById(id) {
    return Product.findById(id);
  }

  addProduct(data) {
    const product = new Product(data);
    return product.save();
  }

  updateProduct({ id, product }) {
    return Product.findByIdAndUpdate(
      id,
      { $set: { ...product } },
      { new: true }
    );
  }

  async deleteProduct(id) {
    const currentProduct = await this.getProductById(id);
    const { images } = currentProduct;

    const imagesToDelete = [
      images.slider,
      ...Object.values(images.product).map((img) => img.publicId)
    ].filter((val) => val);

    await ImagesService.deleteImages(imagesToDelete);

    return Product.findByIdAndRemove(id);
  }
}

export default new ProductService();
