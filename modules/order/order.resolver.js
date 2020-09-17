import orderService from './order.service';

const orderQuery = {
    getOrders: () => orderService.getOrders(),
    getOrderById: (parent, args) => orderService.getOrderById(args.id),
};

const orderMutation = {
    addOrder: (parent, args) => orderService.addOrder(args.order),
    deleteOrder: (parent, args) => orderService.deleteOrder(args.id),
    updateOrderStatus: (parent, args) => orderService.updateOrderStatus(args),
};

export {orderQuery, orderMutation};
