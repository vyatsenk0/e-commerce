import styled from 'styled-components'
import { Link } from 'react-router-dom';


const Info = styled.div`
    opacity: 0;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0,0,0,0.2);
    z-index: 3;
    display: flex;
    align-items: center;
    justify-content: center;
    
    transition: all 0.5s ease;
`

const Image = styled.img`
    height: 18.5em;
    width: 60vh;
    object-fit: cover;
    filter: brightness(85%);
    
`



const Title = styled.h1`
  font-family: "Bebas Neue", sans-serif;
  color: rgb(207, 206, 206);
  font-size: 1.4em;
  letter-spacing: 0.05em;
  margin: 0.5em 0;
  width: 90%;


  @media only screen and (max-width: 480px) {
    font-size: 0.8em;
  }
`;

const PriceContainer = styled.div`
    display: flex;
    color: white;
    border: 1px solid white;
    width: 5.5em;
    text-align: center;
    padding: 0.3em;
    border-radius: 10px;
    font-size: 1.6em;
`


const Container = styled.div`
   
  display: flex;
  flex-direction: column;
  height: 60vh;
  width: 60vh;
  margin: 0.9em;
  border: 2px solid rgb(210, 209, 209);
  padding: 0.5em;

  &:hover ${Info}{
        opacity: 1;
    }
    &:hover ${Image} {
    filter: brightness(50%);
    transition: all 0.3s ease;
  }
  &:hover ${Title} {
    color: rgb(0, 0, 0);
   
  }
  &:hover ${PriceContainer} {
    color: rgb(0, 0, 0);
    border: 1px solid rgb(0, 0, 0);
  }
  &:hover{
    border: 2px solid rgb(0, 0, 0);
  }

`

const Product = ({item}) => {
  return (
    <Link style={{ textDecoration: "none" }} to={`/products/${item._id}`}>
    <Container>
    
    <Image src={item.img} />
    <Title>{item.title}</Title>
    
    <PriceContainer>$ {item.price} CAD</PriceContainer>
    </Container>
    </Link>
    
  )
}

export default Product