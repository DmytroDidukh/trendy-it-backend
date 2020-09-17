import {categoryQuery, categoryMutation} from './modules/category/category.resolver';
import {productQuery, productMutation} from './modules/product/product.resolver';
import {orderQuery, orderMutation} from './modules/order/order.resolver';
import {userQuery, userMutation} from './modules/user/user.resolver';
import {bannerQuery, bannerMutation} from './modules/banner/banner.resolver';

const resolvers = {
    Query: {
        ...categoryQuery,
        ...productQuery,
        ...orderQuery,
        ...userQuery,
        ...bannerQuery,
    },
    Mutation: {
        ...categoryMutation,
        ...productMutation,
        ...orderMutation,
        ...userMutation,
        ...bannerMutation,
    }};

export default resolvers;
