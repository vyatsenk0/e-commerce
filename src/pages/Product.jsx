import { styled } from "styled-components"

import NavBar from "../components/NavBar"
import Footer from "../components/Footer"
import Remove from '@mui/icons-material/Remove';
import  Add  from '@mui/icons-material/Add';
import mobile from "../responsive";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { publicRequest } from "../requestMethod";
import { addProduct } from "../redux/cartRedux";
import { useDispatch, useSelector } from "react-redux";
import { ShoppingCartOutlined } from "@mui/icons-material";

const Container = styled.div`
    background-image: url("https://wallpapercave.com/wp/wp3569640.jpg");
`

const Wrapper = styled.div`
    display: flex;
    padding: 5em;
    ${mobile({ padding: "10px", flexDirection: "column"})}

`

const ImgContainer = styled.div`
    flex: 1;
    margin-left: 20em;
`

const Image = styled.img`
    width: 25em;
    flex: 1;
    height: 50vh;
    border: 1px ridge white;
    border-radius: 10px;
    object-fit: cover;
    ${mobile({ height: "40vh"})}
`

const InfoContainer = styled.div`
    flex: 1;
    padding: 0em 3em;
    margin-top: 2em;
    margin-right: 3em;
    ${mobile({ padding: "10px"})}
`

const Title = styled.h1`
    font-weight: 700;
    margin-bottom: 1em;
   
    color: white;
    font-size: 2.5em;
    width: 30vw;
    text-align: left;
  
`


const Price = styled.span`
    font-weight: 600;
    font-size: 2.5em;
    color: white;
    border: 1px solid rgb(231, 231, 231);
    border-radius: 10px;
    padding: 0.15em 0.35em;
    
`



const AddContainer = styled.div`
    display: flex;
    align-items: center;
    width: 50%;
    justify-content: space-between;
    ${mobile({ width: "100%"})}
`

const AmountContainer = styled.div`
    display: flex;
    align-items: center;
    font-weight: 700;
    margin-right: 1.2em;
    margin-top: 2.5em;
`

const Amount = styled.span`
    width: 2em;
    height: 2em;
    border-radius: 10px;
    border: 1px solid teal;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 0.3em;
`

const Button = styled.button`
    display: flex;
    align-items: center;
    padding: 0.5em 1em;
    background: rgb(232, 224, 224);
    margin-right: 30px;
    margin-top: 1.4em;
    width: 10.5em;
    border-radius: 5px;
    font-size: 1.2em;
    border: 3px solid teal;
  &:hover {
    cursor: pointer;
    background: rgb(172, 172, 172);
  }
`


const ButtonContainer = styled.div`
  display: flex;
  margin-top: 0.5em;
  
`;






const Product = () => {
    const location = useLocation();
    const id = location.pathname.split("/")[2];
   
    const [product, setProduct] = useState({})
    const [quantity, setQuantity] = useState(1)

    const dispatch = useDispatch();
  

    useEffect(() => {
        const getProduct = async () => {
            try {
                const res = await publicRequest.get("/products/find/"+id)
                console.log(res)
                setProduct(res.data)
            } catch (error) {
                console.log(error)
            }
        };
        getProduct();
    }, [id])


    const handleQuantity = (type) => {
        if (type === "dec") {
            quantity > 1 && setQuantity(quantity - 1)
        } else {
            setQuantity(quantity + 1)
        }
    }

    const handleClick = () => {
        dispatch(addProduct({ ...product, quantity }))
    }


    const user = useSelector((state) => state.user);

  return (
    
    <Container>
        <NavBar/>

        <Wrapper>
            <ImgContainer>
                <Image src={product.img}/>
            </ImgContainer>
            <InfoContainer>
                <Title>{product.title}</Title>
                
                <Price>${product.price} CAD</Price>
                <AddContainer>
                    <AmountContainer>
                        <Remove  style={{ color: 'white'}} onClick={() => handleQuantity("dec")}/>
                        <Amount  style={{ color: 'white'}} >{quantity}</Amount>
                        <Add style={{ color: 'white'}} onClick={() => handleQuantity("inc")} />
                    </AmountContainer>

                    {user.currentUser ? (
                    <ButtonContainer>
                    <Button onClick={handleClick}> ADD TO CART
                    <ShoppingCartOutlined  style={{ marginLeft: "4px", }} />
                    </Button>
                    </ButtonContainer>

                    ) : (
                        <ButtonContainer>
                    <Button onClick={() => alert("Please login to add products to cart")}> ADD TO CART
                    <ShoppingCartOutlined  style={{ marginLeft: "4px", }} />
                    </Button>
                    </ButtonContainer>
                    )}
                    
                </AddContainer>
            </InfoContainer>
        </Wrapper>

        
        <Footer/>
    </Container>
  )
}

export default Product;