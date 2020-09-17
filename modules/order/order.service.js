import {Order} from '../../models';

class OrderService {
    getOrders() {
        return Order.find();
    }

    getOrderById(id) {
        return Order.findById(id);
    }

    addOrder(data) {
        const order = new Order(data);
        return order.save();
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
