import {Order} from '../../models';
import sendEmail from "../../utils/sendmail";
import orderMailMessage from "../../utils/orderMailMessage";

class OrderService {
    getOrders() {
        return Order.find();
    }

    getOrderById(id) {
        return Order.findById(id);
    }

    async addOrder(data) {
        const order = await new Order(data);
        await order.save()

        const message = {
            from: process.env.MAIL_USER,
            to: order.customer.email,
            cc: [{email: process.env.MAIL_CC}],
            subject: 'Trendy IT',
            html: orderMailMessage(order),
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
        return Order.findByIdAndRemove(id)
    }
}

export default new OrderService();
