import "../Style/Product.css";
import { Fragment, useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons';
import { faStarHalf } from '@fortawesome/free-regular-svg-icons';
function ProductInfo() {
  const [inputValue, setInputValue] = useState<ProductDetail | null>(null);
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const productID = localStorage.getItem("productID");
  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating - fullStars >= 0.5;

    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FontAwesomeIcon icon={faStar} key={`full-star-${i}`} color="#f0c419" />);
    }

    if (halfStar) {
      stars.push(<FontAwesomeIcon icon={faStarHalf} key="half-star" color="#f0c419" />);
    }

    const emptyStars = 5 - stars.length;

    for (let i = 0; i < emptyStars; i++) {
      stars.push(<FontAwesomeIcon icon={faStarRegular} key={`empty-star-${i}`} color="#f0c419" />);
    }

    return stars;
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3002/products/${productID}`, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json() as ProductDetail; // Type assertion to Product
        console.log(data);
        setInputValue(data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);

  const onSubmithandler = () => {
    const token = localStorage.getItem('token');
    if (token) {
      // Construct the data to send to the server, including the selected quantity
      const data = {
        productid :productID,
        quantity: selectedQuantity,
      };
      console.log('daata', data)

      fetch('http://localhost:3003/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      })
        .then((response) => {
          if (response.ok) {
            console.log('Added to cart');
            alert('Added to cart');
          } else {
            console.log('Failed to add to cart');
          }
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }
    else{
      console.log('user not authentificated');
            window.location.href = '/login';
    }
  };
  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = parseInt(event.target.value);
    if(inputValue){

      if (!isNaN(newQuantity) && newQuantity > 0 && newQuantity <= inputValue.stock) {
        setSelectedQuantity(newQuantity);
      }
    }
  };

  return (
    <Fragment>
    <div className="product">
      
      <div className="main">
        <div className="left">
          <h1>{inputValue?.name}</h1>
          Category |<h2> {inputValue?.category}</h2>
          <img style={{ height:'200px'}}
            src={inputValue?.image}
            alt=""
          />
        </div>
        <div className="right">
        <div className="star-ratings">
          {renderStars(inputValue?.rating || 0)}
        </div>
          <p>
           {inputValue?.description}
          </p>
          <h3>${inputValue?.price}</h3>

          <p className="quantity">
              QUANTITY
              <span
                className="fa fa-angle-left angle"
                onClick={() => setSelectedQuantity(Math.max(1, selectedQuantity - 1))}
              ></span>
              <input
                type="number"
                id="quantityInput"
                value={selectedQuantity}
                onChange={handleQuantityChange}
              />
              <span
                className="fa fa-angle-right angle"
                onClick={() => setSelectedQuantity(Math.min(inputValue?.stock || 1, selectedQuantity + 1))}
              ></span>
            </p>
        </div>
      </div>
      <div className="footer">
      <div className="left">
            <p>Total price</p>
            <p id="price">${((inputValue?.price || 0) * selectedQuantity).toFixed(2)}</p>
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
// product.ts (a separate file, for example)
export interface ProductDetail {
  name: string;
  category: string;
  image: string;
  rating: number;
  description: string;
  price: number;
  stock: number;
}
