import React, { useEffect } from 'react'

import Navbar from "../components/Navbar";
import Payment from "../components/Payment";

function StripePayment() {
  const payment = JSON.parse(localStorage.getItem("payment"));
  const token = JSON.parse(localStorage.getItem("token"));

  console.log(payment);

  useEffect(() => {
    fetch("http://91.172.40.53:8080/user/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(
        {
        "deliveryDate": "2023-04-22",
        price: payment.price,
        garmentsId: payment.ids,
        "billingAddress": {
          "street": "string",
          "city": "string",
          "state": "string",
          "zipCode": "string",
          "country": "string"
        },
        "deliveryAddress": {
          "street": "string",
          "city": "string",
          "state": "string",
          "zipCode": "string",
          "country": "string"
        }
      }),
    }).then(console.log)
  }, []);

    return(
        <div>
            <Navbar />
            <Payment />
        </div>
    );
}

export default StripePayment;
