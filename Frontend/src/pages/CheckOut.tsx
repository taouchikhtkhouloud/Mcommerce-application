import { Fragment, useState } from "react";
import "../Style/CheckOut.css";
import axios from 'axios';

function CheckOut() {
  const [formData, setFormData] = useState({
    cardNumber: "",
    cardHolder: "",
    expireDate: "",
    cvcCode: "",
  });

  const { cardNumber, cardHolder, expireDate, cvcCode } = formData;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };


  const submitHandler = async () => {
    const token = localStorage.getItem("token");
    console.log('token', token);
  
    // Check if token exists
    if (!token) {
      console.log("Token not found");
      return;
    }
  
    if (!cardNumber || !cardHolder || !expireDate || !cvcCode) {
      alert("Please fill out all required fields in the form.");
      return;
    }
  
    try {
      const response = await axios.post("http://localhost:9000/payment/pay", {}, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + token,
        },
      });
  
      if (response.status === 200) {
        // Update the local state to reflect the deleted product.
        console.log("res", response);
        alert("Your order has been placed!");
        window.location.href = "/";
      } else {
        console.log("some error");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };
  
  return (
    <Fragment>
      <div className="wrapper">
        <div className="spaceto">
          <div className="containers">
            <div className="title">Checkout Form</div>

            <div className="input-form">
              <div className="section-1">
                <div className="items">
                  <label className="label">Card Number</label>
                  <input
                    type="text"
                    name="cardNumber"
                    className="input"
                    maxLength={16}
                    placeholder="1234123412341234"
                    value={cardNumber}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="section-2">
                <div className="items">
                  <label className="label">Card Holder</label>
                  <input
                    type="text"
                    name="cardHolder"
                    className="input"
                    placeholder="Coding Market"
                    value={cardHolder}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="section-3">
                <div className="items">
                  <label className="label">Expire Date</label>
                  <input
                    type="text"
                    name="expireDate"
                    className="input"
                    placeholder="MM / YY"
                    value={expireDate}
                    onChange={handleChange}
                  />
                </div>
                <div className="items">
                  <div className="cvc">
                    <label className="label">CVC Code</label>
                    <div className="tooltip">
                      ?
                      <div className="cvc-img">
                        <img src="https://i.imgur.com/r8oXtry.png" alt="" />
                      </div>
                    </div>
                  </div>
                  <input
                    type="text"
                    name="cvcCode"
                    className="input"
                    placeholder="0000"
                    value={cvcCode}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="bat" onClick={submitHandler}>
              Proceed
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default CheckOut;
