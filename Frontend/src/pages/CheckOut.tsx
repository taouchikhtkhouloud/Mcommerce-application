import { Fragment } from "react";
import "../Style/CheckOut.css";
function CheckOut() {

  const submitHandler = async () => {
    const token = localStorage.getItem("token");
        console.log('tokem', token);

        // Check if token exists
        if (!token) {
          console.log("Token not found");
          return;
        }
    try {
      const response = await fetch("http://localhost:3004/payment/pay", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + token,
        },
      });

      if (response.ok) {
        // Update the local state to reflect the deleted product.
        console.log("res",response)
        alert("Your order has been placed!");
        window.location.href = "/";

      }
      else{
        console.log("some error")
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
                  <label className="label">card number</label>
                  <input
                    type="text"
                    className="input"
                    maxLength={10}
                    data-mask="0000 0000 0000 0000"
                    placeholder="1234 1234 1234 1234"
                  />
                </div>
              </div>
              <div className="section-2">
                <div className="items">
                  <label className="label">card holder</label>
                  <input
                    type="text"
                    className="input"
                    placeholder="Coding Market"
                  />
                </div>
              </div>
              <div className="section-3">
                <div className="items">
                  <label className="label">Expire date</label>
                  <input
                    type="text"
                    className="input"
                    data-mask="00 / 00"
                    placeholder="MM / YY"
                    
                  />
                </div>
                <div className="items">
                  <div className="cvc">
                    <label className="label">cvc code</label>
                    <div className="tooltip">
                      ?
                      <div className="cvc-img">
                        <img src="https://i.imgur.com/r8oXtry.png" alt="" />
                      </div>
                    </div>
                  </div>
                  <input
                    type="text"
                    className="input"
                    data-mask="0000"
                    placeholder="0000"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="bat"  onClick={()=>submitHandler()} >proceed</div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
export default CheckOut;
