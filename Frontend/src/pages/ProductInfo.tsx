import "../Style/Product.css";
import { Fragment, useState, useEffect } from "react";

function ProductInfo() {
  const [inputValue, setInputValue] = useState({});
  const productID = localStorage.getItem("productID");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3002/products/${productID}`, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        console.log(data);
        setInputValue(data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);

  const onSubmithandler = () => {
    const token = localStorage.getItem("token");
    if (token) {
      console.log("Add to cart");
      fetch(`http://localhost:3003/cart/${productID}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          if (response.ok) {
            console.log("Added to cart");
            alert("Added to cart");
          } else {
            console.log("Failed to add to cart");
            window.location.href = "/login";
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }

  

  };

  return (
    <Fragment>
    <div className="product">
      
      <div className="main">
        <div className="left">
          <h1>{inputValue.name}</h1>
          Category |<h2> {inputValue.category}</h2>
          <img style={{ height:'200px'}}
            src={inputValue.image}
            alt=""
          />
        </div>
        <div className="right">
          <p>
            <span className="fa fa-star yellow"></span>
            <span className="fa fa-star yellow"></span>
            <span className="fa fa-star yellow"></span>
            <span className="fa fa-star yellow"></span>
            <span className="fa fa-star"></span>
            <span>(4.67 - 172 reviews)</span>
          </p>
          <p>
           {inputValue.description}
          </p>
          <h3>${inputValue.price}</h3>

          <p className="quantity">
            QUANTITY <span className="fa fa-angle-left angle"></span>
            <span id="qt">3</span>
            <span className="fa fa-angle-right angle"></span>
          </p>
        </div>
      </div>
      <div className="footer">
        <div className="left">
          <p>Total price</p>
          <p id="price">$960.00</p>
        </div>
        <div className="right">
        <button style={{backgroundColor:'#672bac', borderColor:'#672bac'}} onClick={onSubmithandler}  className="btn btn-primary">
        Add to Cart
      </button>        </div>
      </div>
    </div>
    </Fragment>
  );
}

export default ProductInfo;
