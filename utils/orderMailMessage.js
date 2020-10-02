const orderMailMessage = (order) => {
  const COLORS_DATA = {
    black: { hex: '#000000' },
    silver: { hex: '#6c757d' },
    white: { hex: '#ffffff' },
    blue: { hex: '#007bff' },
    yellow: { hex: '#ffc107' },
    orange: { hex: '#fd7e14' },
    red: { hex: '#dc3545' },
    green: { hex: '#28a745' },
    pink: { hex: '#e83e8c' },
    purple: { hex: '#6f42c1' },
    brown: { hex: '#692e19' }
  };

  const products = order.products
    .map(
      (product, i) =>
        `<tr>
           <td style='border: 1px solid #333; text-align: center;'>${i + 1}</td>
           <td style='border: 1px solid #333;' >${product.name}</td>
           <td style='border: 1px solid #333; text-align: center;'>
                <span style='background-color: ${
                  COLORS_DATA[product.color].hex
                }; 
                                display: inline-block;
                                width: 20px;
                                height: 20px;
                                border: 1px solid #f1f1f1;
                                border-radius: 50%;'/>
           </td>
           <td style='border: 1px solid #333; text-align: center;'>${
             product.quantity
           }</td>
           <td style='border: 1px solid #333; text-align: center;'>${
             product.price
           }</td>
        </tr>`
    )
    .join('');

  const delivery = () => {
    switch (order.delivery.method) {
      case 'кур‘єром': {
        return `<p>Адреса: <span style='font-weight: bold; margin-left: 5px;'> ${
          order.delivery.city
        },
                                        вул. ${order.delivery.address.street},
                                        буд. ${order.delivery.address.built}
                                ${
                                  order.delivery.address.apartment
                                    ? `<span style='font-weight: bold; margin-left: 5px;'>, кв. ${order.delivery.address.apartment} </span>`
                                    : ''
                                }
                                   </span> 
                     </p>`;
      }
      case 'на відділення Нової Пошти': {
        return `<p>Адреса:
                            <span style='font-weight: bold; margin-left: 5px;'>${order.delivery.city}, відділення ${order.delivery.postOffice}</span>
                        </p>`;
      }
      default: {
        return '';
      }
    }
  };

  const totalByProducts = order.products.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  );
  const deliveryPriceBlock = order.deliveryPrice
    ? `<p style='text-align: right;
                                            margin: 10px;
                                            font-size: 12px;'>
                                    Ціна доставки: <span style='font-weight: bold; margin-left: 5px;'>${order.deliveryPrice} UAH</span>
                                  </p>`
    : '';

  return `                                        
    <div style='border: 1px solid silver;
                margin: 50px auto;
                border-radius: 20px;
                background-color: #e0e0e0;
                padding: 50px;
                width: 500px;
                box-sizing: content-box;'>
            <h3 style='text-align: center;'>Замовлення №: ${order.orderId}</h3>
            <hr/>
            <div>
                <p>Покупець: <span style='font-weight: bold; margin-left: 5px;'>${
                  order.customer.surname
                }, ${order.customer.name}</span></p>
                <p>Ел. пошта: <span style='font-weight: bold; margin-left: 5px;'>${
                  order.customer.email
                }</span></p>
                <p>Телефон: <span style='font-weight: bold; margin-left: 5px;'>${
                  order.customer.phone
                }</span></p>
                <br/>
                <p>Метод зв‘язку: <span style='font-weight: bold; margin-left: 5px;'>${
                  order.connectionMethod
                }</span></p>
                <p>Спосіб доставки: <span style='font-weight: bold; margin-left: 5px;'>${
                  order.delivery.method
                }</span></p>
                ${delivery()}         
                <hr/>
                <table style='width: 100%;'>
                    <thead>
                    <tr>
                        <th style='border: 1px solid #333;
                                    color: white;
                                    background: #4a4a4a;
                                    text-align: center;'>#</th>
                        <th style='border: 1px solid #333;
                                    color: white;
                                    background: #4a4a4a;
                                    text-align: center;'>Товар</th>
                        <th style='border: 1px solid #333;
                                    color: white;
                                    background: #4a4a4a;
                                    text-align: center;'>Колір</th>
                        <th style='border: 1px solid #333;
                                    color: white;
                                    background: #4a4a4a;
                                    text-align: center;'>Кількість</th>
                        <th style='border: 1px solid #333;
                                    color: white;
                                    background: #4a4a4a;
                                    text-align: center;'>Ціна за шт.</th>
                    </tr>
                    </thead>
                    <tbody>
                        ${products}
                    </tbody>
                </table>
                <hr/>
                <p style='text-align: right;
                          margin: 10px;
                          font-size: 12px;'>
                          Сума товару: <span style='font-weight: bold; margin-left: 5px;'>${totalByProducts} UAH</span></p>
                ${deliveryPriceBlock}
                <p style='text-align: right;
                          margin: 10px;
                          font-size: 14px;'>
                Загалом: <span style='font-weight: bold; margin-left: 5px;'>${
                  totalByProducts + order.deliveryPrice
                } UAH</span></p>
                <hr/>
                <p>Наш менеджер зв‘яжеться з Вами у зручний для Вас спосіб.</p>
                <h4>З найкращими побажаннями, команда Trendy IT 
                    <span style='background: #009344;
                       display: inline-block;
                       width: 8px;
                       height: 13px;'/>
                      <span style='background: #ffffff;
                                display: inline-block;
                                 width: 8px;
                                 height: 13px;'/>
                      <span style='background: #cf2734;
                                    display: inline-block;
                                    width: 8px;
                                    height: 13px;'/>
                 </h4>
            </div>
        </div>
`;
};

export default orderMailMessage;
