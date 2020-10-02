import {Order, Product} from '../../models';
import sendEmail from '../../utils/sendmail';
import orderMailMessage from '../../utils/orderMailMessage';

class OrderService {
  async getOrders(filter, page) {
    const options = {
      page: parseInt(page, 10) || 1,
      limit: 20,
      sort: '-createdAt',
    };
    const query = filter ? {status: filter} : {}

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
      cc: [{ email: process.env.MAIL_CC }],
      subject: 'Trendy IT',
      html: orderMailMessage(order)
    };

    await sendEmail(message);

    return order;
  }

  updateOrderStatus({ id, status }) {
    return Order.findOneAndUpdate(
      { _id: id },
      { status: status },
      { returnOriginal: false }
    );
  }

  deleteOrder(id) {
    return Order.findByIdAndRemove(id);
  }
}

export default new OrderService();
