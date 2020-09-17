import {categoryQuery, categoryMutation} from './modules/category/category.resolver';
import {subcategoryQuery, subcategoryMutation} from './modules/subcategory/subcategory.resolver';
import {productQuery, productMutation} from './modules/product/product.resolver';
import {orderQuery, orderMutation} from './modules/order/order.resolver';
import {userQuery, userMutation} from './modules/user/user.resolver';
import {bannerQuery, bannerMutation} from './modules/banner/banner.resolver';

import CategoryService from "./modules/category/category.service";
import SubcategoryService from "./modules/subcategory/subcategory.service";
import ProductService from "./modules/product/product.service";

const resolvers = {
    Query: {
        ...categoryQuery,
        ...subcategoryQuery,
        ...productQuery,
        ...orderQuery,
        ...userQuery,
        ...bannerQuery,
    },
    Mutation: {
        ...categoryMutation,
        ...subcategoryMutation,
        ...productMutation,
        ...orderMutation,
        ...userMutation,
        ...bannerMutation,
    },
    Category: {
        subcategories: (parent) => SubcategoryService.getSubcategoriesByCategoryId(parent.id),
    },
    Subcategory: {
        category: (parent) => CategoryService.getCategoryById(parent.categoryId),
    },
    Product: {
        category: (parent) => CategoryService.getCategoryById(parent.categoryId),
        subcategory: (parent) => SubcategoryService.getSubcategoryById(parent.subcategoryId),
    }
};

export default resolvers;
