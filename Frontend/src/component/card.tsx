import "../Style/home.css";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBBtn
} from 'mdb-react-ui-kit';
interface Props {
  name: string;
  price: number;
  imgsrc: string;
  category: string;
}

const Card = ({ name, price, imgsrc, category }: Props) => {
  return (
    <div className="card shadow p-3 mb-5 bg-body-tertiary rounded" style={{ width: '250px', height:'350px', margin:'10px' }}>
    <img src={imgsrc} className="card-img-top " alt="..."style={{  height:'250px' }}/>
    <div className="card-body">
      <h5 style={{color:'#672bac'}} className="card-title ">{name}</h5>
      <p className="card-text">
        {category}
      </p>
      <p className="card-text bold">
        {price}$
      </p>
      <a style={{backgroundColor:'#672bac', borderColor:'#672bac'}} href="#" className="btn btn-primary">
        View Product
      </a>
    </div>
  </div>
  );
};

export default Card;
