import "../Style/home.css";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons';
import { faStarHalf } from '@fortawesome/free-regular-svg-icons';
interface Props {
  name: string;
  price: number;
  imgsrc: string;
  category: string;
  rating: number;
}

const Card = ({ name, price, imgsrc, category, rating }: Props) => {
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

  return (
    <div className="card shadow p-3 mb-5 bg-body-tertiary rounded" style={{ width: '250px', height:'350px', margin:'10px' }}>
      <img src={imgsrc} className="card-img-top " alt="..." style={{ height:'250px' }} />
      <div className="card-body">
        <h5 style={{ color:'#672bac' }} className="card-title">{name}</h5>
        <p className="card-text">
          {category}
        </p>
        <p className="card-text bold">
          {price}$
        </p>
        <div className="star-ratings">
          {renderStars(rating)}
        </div>
        <a style={{ backgroundColor:'#672bac', borderColor:'#672bac' }} href="#" className="btn btn-primary">
          View Product
        </a>
      </div>
    </div>
  );
};

export default Card;
