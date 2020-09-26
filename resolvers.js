import {productQuery, productMutation} from './modules/product/product.resolver';
import {orderQuery, orderMutation} from './modules/order/order.resolver';
import {userQuery, userMutation} from './modules/user/user.resolver';
import {bannerQuery, bannerMutation} from './modules/banner/banner.resolver';
import {novaPoshtaQuery, novaPoshtaMutation} from './modules/novaposhta/novaposhta.resolver';
import {uploadQuery, uploadMutation} from './modules/upload/upload.resolver';

const resolvers = {
    Query: {
        ...productQuery,
        ...orderQuery,
        ...userQuery,
        ...bannerQuery,
        ...novaPoshtaQuery,
        ...uploadQuery,
    },
    Mutation: {
        ...productMutation,
        ...orderMutation,
        ...userMutation,
        ...bannerMutation,
        ...novaPoshtaMutation,
        ...uploadMutation,
    }};

export default resolvers;
