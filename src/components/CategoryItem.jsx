import React from 'react';
import styled  from "styled-components"
import  mobile  from '../responsive';
import { Link } from 'react-router-dom';



const Wrapper = styled.div`
    height: 65vh;
    width: 30vw;
   
`


const Image = styled.img`
    width: 100%;
    filter: brightness(70%);
    height: 60vh;
    display: flex;
    object-fit: cover;
    ${mobile({ height: "20vh"})}
`

const Info = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

const Title = styled.h1`
    color: white;
    border: 2px solid rgba(212, 152, 13, 0.5);
    border-radius: 10px;
    text-align: center;
    width: 6em;
    padding: 0em 0.2em;
    background-color: black;
    margin-bottom: 0.5em;

`

const Button = styled.button`
    border: none;
    border: 2px solid rgba(16, 200, 77, 0.5);
    border-radius: 7px;
    margin-top: 18em;
    padding: 0.7em 1.6em;
    background-color: black;
    color: white;
    cursor: pointer;
    font-weight: 600;
    font-size: 15px;
`

const Container = styled.div`
    flex: 1;
    border: 2px solid rgba(165, 165, 165, 0.5);
    margin-top: 2em;
    margin-left: 2.5em;
    width: 25em;
    height: 60vh;
    position: relative;
    display: flex;
   

    &:hover ${Image} {
    filter: brightness(30%);
    transition: all 0.3s ease;
  }

  &:hover ${Title} {
    filter: brightness(30%);
    transition: all 0.3s ease;
  }

  &:hover ${Button} {
    filter: brightness(30%);
    transition: all 0.3s ease;
  }
`

const CategoryItem = ({ item } ) => {

 const cat = item.cat.toUpperCase()
  return (
    <Wrapper>
    <Container>
    
        <Link to={`/products/${item.cat}/${item.id}`}>
        <Image src = {item.img} />
        <Info>
            <Title>{cat}</Title>
            <Button>SHOP NOW</Button>
        </Info>
        </Link>
        
    </Container>
    </Wrapper>
  )
}

export default CategoryItem