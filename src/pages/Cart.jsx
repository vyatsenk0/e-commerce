import React, { useMemo, useState } from "react";
import styled from "styled-components";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearCart, removeFromCart } from "../redux/cartRedux";
import StripeCheckout from 'react-stripe-checkout';

const KEY = ""

const Container = styled.div`
  background: rgb(0, 0, 0);
  background-image: url("https://wallpapercave.com/wp/wp3569640.jpg");
  background-size: cover;
  color: rgb(211, 211, 211);
 
  

  @media only screen and (max-width: 480px) {
    width: 117%;
  }
`;


const Wrapper = styled.div`
  padding: 2em;
`;


const Title = styled.h1`
  font-family: "Bebas Neue", sans-serif;
  font-size: 3rem;
  text-align: center;
  letter-spacing: 0.05em;
  color: white;
  @media only screen and (max-width: 480px) {
    font-size: 2em;
  }
`;


const Top = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2em;

  @media only screen and (max-width: 480px) {
    padding: 1em;
    font-size: 0.8em;
  }
`;


const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
`;


const Info = styled.div`
  flex: 2;
`;


const Summary = styled.div`
  flex: 1;
  background: rgba(21, 19, 19, 0.7);
  
  height: fit-content;
  padding: 1em;
  margin: 1em 0;
  border-radius: 10px;
`;


const ButtonTop = styled.button`
  text-transform: uppercase;
  font-size: 1em;
  font-weight: 600;
  
  padding: 0.5em 1em;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:first-child {
    
    color: rgb(230, 230, 230);
    background: rgba(19, 15, 15, 0.3);
    border: 1px solid rgb(230, 230, 230);
  }
  &:first-child:hover {
    background: rgba(163, 162, 162, 0.3);
  }
  &:last-child {
    background: transparent;
    color: rgb(185, 127, 20);
    background: rgba(19, 15, 15, 0.3);
    border: 1px solid rgb(185, 127, 20);
  }
  &:last-child:hover {
    background: rgba(185, 127, 20, 0.3);
  }
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid rgba(173, 173, 173, 0.5);

  @media only screen and (max-width: 480px) {
    flex-direction: column;
  }
`;


const ProductDetail = styled.div`
  flex: 3;
  display: flex;
  padding: 1em 0;

  @media only screen and (max-width: 480px) {
    flex-direction: column;
  }
`;


const Image = styled.img`
  border: 1px solid rgb(172, 171, 171);
  width: 20vw;
  object-fit: cover;
  padding: 0.5em;
`;

const Details = styled.div`
  color: white;
  display: flex;
  flex-direction: column;
  padding: 1em;

  @media only screen and (max-width: 480px) {
    flex-direction: column;
    padding: 1em 0em;
  }
`;


const ProductName = styled.span`
  font-size: 1.7em;
  font-weight: 600;

  @media only screen and (max-width: 480px) {
    font-size: 1em;
  }
`;


const ProductBrand = styled.span`
  font-size: 1.2em;
  margin: 30px 0 10px 0;

  @media only screen and (max-width: 480px) {
    font-size: 0.8em;
    margin: 0em;
  }
`;


const ProductId = styled.span`
   color: white;
  font-size: 0.9em;
  margin: 0.5em 0;

  @media only screen and (max-width: 480px) {
    font-size: 0.5em;
  }
`;


const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 1em;
  align-items: center;
  font-size: 1.2em;
  justify-content: center;

  @media only screen and (max-width: 480px) {
    padding: 0;
    font-size: 0.8em;
    align-items: flex-start;
    justify-content: flex-start;
  }
`;


const ProductPrice = styled.span`
  font-size: 1.5em;
  font-weight: 500;
  color: white;
  margin-top: 1em;
`;


const SummaryTitle = styled.h1`
  text-transform: uppercase;
  margin-bottom: 1em;
  text-align: center;

  @media only screen and (max-width: 480px) {
    font-size: 1em;
  }
`;


const SummaryItem = styled.div`
  margin: 1em 0;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "600"};
  font-size: ${(props) => props.type === "total" && "1.3em"};
  border-top: ${(props) =>
    props.type === "total" && "1px dotted rgb(180, 180, 180)"};
  padding-top: ${(props) => props.type === "total" && "1em"};

  @media only screen and (max-width: 480px) {
    font-size: 0.8em;
    margin: 0.4em 0em;
    flex-direction: column;
  }
`;


const SummaryItemText = styled.span`
  @media only screen and (max-width: 480px) {
    font-size: 0.8em;
  }
`;


const SummaryItemPrice = styled.span`
  @media only screen and (max-width: 480px) {
    font-size: 0.8em;
    font-weight: bold;
  }
`;


const Button = styled.button`
  text-transform: uppercase;
  font-size: 1em;
  font-weight: 600;
  padding: 0.5em 1em;
  border: 1px solid rgb(185, 127, 20);
  color: rgb(185, 127, 20);
  border-radius: 5px;
  width: 100%;
  background: transparent;

  &:hover {
    background: rgba(165, 137, 10, 0.3);
  }

  @media only screen and (max-width: 480px) {
    font-size: 0.5em;
  }
`;


const Productquantity = styled.span`
  font-size: 1.2em;
  margin: 0px 0px 30px 0px;

  @media only screen and (max-width: 480px) {
    font-size: 0.8em;
    margin: 0em;
  }
`;


const DeleteButton = styled.button`
  padding: 0.5em 1em;
  margin: 1em 0;
  text-transform: uppercase;
  font-size: 1em;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background: transparent;
  color: rgba(181, 41, 41, 0.8);
  font-weight: 700;
  background-color: rgba(0, 0, 0, 0.3);
  border: 2px solid rgba(7, 7, 7, 0.5);

  &:hover {
    background: rgba(163, 162, 162, 0.3);
  }

  @media only screen and (max-width: 480px) {
    font-size: 0.7em;
    width: 40%;
  }
`;


const Msg = styled.h2`
  text-align: center;
  font-size: 2em;
  margin: 2em 0 1em;
`;


const ClickMsg = styled.h3`
  text-align: center;
  text-decoration: underline;
  cursor: pointer;
  color: rgb(168, 168, 168);

  &:hover {
    color: rgb(211, 211, 211);
  }
`;

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const back = useNavigate();
  const dispatch = useDispatch();


  let shippingPrice = 10;
  let hstPercentage = 0.13;

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handleDeleteItem = (id) => {
    dispatch(removeFromCart(id));
  };

  const uniqueProducts = useMemo(() => {
    const prodMap = {};
    cart.products.forEach((prod) => {
      const { _id, quantity } = prod;
      if (!prodMap[_id] || quantity >= prodMap[_id].quantity) {
        prodMap[_id] = prod;
      }
    });
    const uniqueProducts = Object.values(prodMap);
    return uniqueProducts;
  }, [cart.products]);

  const subtotalPrice = useMemo(() => {
    return uniqueProducts.reduce((subtotal, product) => {
     
      return subtotal + product.price;
    }, 0);
  }, [cart.products, uniqueProducts]);

  const totalPrice = useMemo(() => {
    return subtotalPrice * (1 + hstPercentage) + shippingPrice;
  }, [subtotalPrice]);

  const [stripeToken, setStripeToken] = useState(null);
  const onToken = (token) => {
    setStripeToken(token);
};

  return (
    <>
      <Navbar />
      <Container>
        <Wrapper>
          <Title>Your cart ({cart.quantity} items)</Title>
          <Top>
            <ButtonTop
              onClick={() => {
                back("/");
              }}
            >
              resume shopping
            </ButtonTop>
          
            <ButtonTop onClick={handleClearCart}>Clear Cart</ButtonTop>
          </Top>
          {cart.products.length === 0 ? (
            <>
              <Msg> You have no products in your cart yet</Msg>
              <ClickMsg
                onClick={() => {
                  back("/");
                }}
              >
                Click here to start shopping!
              </ClickMsg>
            </>
          ) : (
            <Bottom>
              <Info>
                {uniqueProducts.map((product) => {
                  return (
                    <Product key={product._id}>
                      <ProductDetail>
                        <Image src={product.img} />
                        <Details>
                          <ProductName>{product.title}</ProductName>
                          
                          <ProductBrand>
                            <b>Brand:</b> {product.brand}
                          </ProductBrand>
                          <Productquantity>
                            <b>Quantity:</b> {product.quantity}
                          </Productquantity>
                          <ProductId>
                            <b>ID:</b> {product._id}
                          </ProductId>
                          <DeleteButton
                            onClick={() => handleDeleteItem(product._id)}
                          >
                            Delete Item
                          </DeleteButton>
                        </Details>
                      </ProductDetail>
                      <PriceDetail>
                        <ProductPrice>$ {product.price} CAD</ProductPrice>
                      </PriceDetail>
                    </Product>
                  );
                })}
              </Info>
              <Summary>
                <SummaryTitle>Order Summary</SummaryTitle>
                <SummaryItem>
                  <SummaryItemText>Subtotal:</SummaryItemText>
                  <SummaryItemPrice>$ {subtotalPrice} CAD</SummaryItemPrice>
                </SummaryItem>
                <SummaryItem>
                  <SummaryItemText>Shipping:</SummaryItemText>
                  <SummaryItemPrice>$ {shippingPrice} CAD</SummaryItemPrice>
                </SummaryItem>
             
                <SummaryItem>
                  <SummaryItemText>HST:</SummaryItemText>
                  <SummaryItemPrice>{hstPercentage * 100} %</SummaryItemPrice>
                </SummaryItem>
                <SummaryItem type="total">
                  <SummaryItemText>Total:</SummaryItemText>
                  <SummaryItemPrice>
                    $ {totalPrice.toFixed(2)} CAD
                  </SummaryItemPrice>
                </SummaryItem>
                <StripeCheckout name="VladislavShop" 
            image=""
            billingAddress
            shippingAddress
            description='Your total is $20'
            amount={2000}
            token={onToken}
            stripeKey={KEY}>
                <Button>Checkout Now</Button>
                </StripeCheckout>
              </Summary>
            </Bottom>
          )}
        </Wrapper>
      </Container>
      <Footer />
    </>
  );
};

export default Cart;