import productService from './product.service';

const productQuery = {
  getProducts: (_, args) => productService.getProducts(args),
  getProductById: (parent, args) => productService.getProductById(args.id)
};

const productMutation = {
  addProduct: (parent, args) => productService.addProduct(args.product),
  updateProduct: (parent, args) => productService.updateProduct(args),
  deleteProduct: (parent, args) => productService.deleteProduct(args.id)
};

export { productQuery, productMutation };
