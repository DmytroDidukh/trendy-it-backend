import {Order, Product} from '../../models';
import sendEmail from '../../utils/sendmail';
import orderMailMessage from '../../utils/orderMailMessage';

class OrderService {
    async getOrders({filter, page}) {
        const options = {
            page: parseInt(page, 10) || 1,
            limit: 20,
            sort: '-createdAt',
        };
        const query = this.filterOrders(filter)

        return await Order.paginate(query, options, (err, result) => ({
            orders: result.docs,
            pagination: {
                totalDocs: result.totalDocs,
                totalPages: result.totalPages,
            }
        }));
    }

    getOrderById(id) {
        return Order.findById(id);
    }

    async addOrder(data) {
        const order = await new Order(data);
        await order.save();

        const message = {
            from: process.env.MAIL_USER,
            to: order.customer.email,
            cc: [{email: process.env.MAIL_CC}],
            subject: 'Trendy IT',
            html: orderMailMessage(order)
        };

        await sendEmail(message);

        return order;
    }

    updateOrderStatus({id, status}) {
        return Order.findOneAndUpdate(
            {_id: id},
            {status: status},
            {returnOriginal: false}
        );
    }

    deleteOrder(id) {
        return Order.findByIdAndRemove(id);
    }

    filterOrders(args = {}) {
        const {search, status} = args;
        const query = {};

        if (status) {
            query.status = status;
        }

        if (!(!search || search.trim().length === 0)) {
            query.$or = [
                {"customer.name": {$regex: new RegExp(search, 'i')}},
                {"customer.surname": {$regex: new RegExp(search, 'i')}},
                {"customer.email": {$regex: new RegExp(search, 'i')}},
                {"delivery.method": {$regex: new RegExp(search, 'i')}},
                {"connectionMethod": {$regex: new RegExp(search, 'i')}},
                {"paymentMethod": {$regex: new RegExp(search, 'i')}},
            ];
        }

        return query;
    }
}

export default new OrderService();
