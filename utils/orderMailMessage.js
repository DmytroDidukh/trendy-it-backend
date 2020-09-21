const orderMailMessage = (order) => {
        console.log(order)
        return `
<div style="
background-color:  #3F3F3F;
height: 450px;
padding-top: 100px;
">
  <div style="
  background-color: white;
  width: 553px;
  height: 140px;
  margin: 28px 88px;
  padding: 52px 45px;
  ">
    <p style="
    margin: 0px
    ">
      Замовлення №: ${order.orderId}
    </p>
    <p style="margin-bottom: 45px">blah blah</p>
    <p>З найкращими побажаннями, команда Trendy IT</p>
  </div>
</div>
`;
};

export default orderMailMessage
