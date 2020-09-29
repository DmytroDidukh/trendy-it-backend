import { Product } from '../../models';
import ImagesService from '../images/images.service';

class ProductService {
  getProducts() {
    return Product.find();
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
