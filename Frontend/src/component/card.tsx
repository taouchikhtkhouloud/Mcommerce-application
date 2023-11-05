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
    <MDBCard style={{ height: '340px', margin: '20px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
      <MDBCardImage src={imgsrc} position='top' alt='Product Image' style={{ height: '200px' }} />
      <MDBCardBody>
        <MDBCardTitle style={{ color: 'dark', fontSize: '1.25rem' }}>{name}</MDBCardTitle>
        <MDBCardText style={{ color: 'gray' }}>{category}</MDBCardText>
        <MDBCardText style={{ color: 'dark', fontWeight: 'bold' }}>${price.toFixed(2)} </MDBCardText>
        <MDBBtn color="dark" >View Product</MDBBtn>
      </MDBCardBody>
    </MDBCard>
  );
};

export default Card;
