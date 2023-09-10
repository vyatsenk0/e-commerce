import styled from 'styled-components'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import Products from '../components/Products'
import mobile from '../responsive'

import { useLocation, useNavigate } from "react-router-dom";
import { useState } from 'react'


const Container = styled.div`
  background-image: url("https://wallpapercave.com/wp/wp3569640.jpg");
  background-size: cover;
  
`

const Title = styled.h1`
  
  margin: 1.2em 0 1em 1.4em;
  color: white;
  
  font-size: 2em;
  text-transform: uppercase;
`

const Span = styled.span`
  color: #a2a1a1;
  font-size: 1.1em;
  
`

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`

const Filter = styled.div`
  margin: 2em 2em 0em 3.2em;
  ${mobile({ width: "0px 20px", display: "flex", flexDirection: "column" })}
`

const FilterText = styled.span`
  font-size: 1.5em;
  font-weight: 600;
  margin-right: 1.1em;
  ${mobile({ marginRight: "0px"})}
  color: white;
`

const Select = styled.select`
  padding: 0.6em;
  margin-right: 1.7em;
  background: transparent;
  border: 2px solid white;
  border-radius: 5px;
  color: white;
  font-size: 1.15em;
  ${mobile({ margin: "10px 0px"})}
`

const Option = styled.option`
  font-size: 1em;
  background: rgb(51, 50, 50);
  color: rgb(234, 229, 229);
`


const ProductList = () => {
  const location = useLocation();
  const cat = location.pathname.split("/")[2];
  

  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState("regular")

  

  const handleFilters = (e) => {
    const value = e.target.value;
    setFilters({
      ...filters,
      [e.target.name]: value,
    });
  }



  return (
    <Container>
      <NavBar />
      
      <Title><Span>Category: </Span>{cat}</Title>

      <FilterContainer>
        <Filter>
          <FilterText>
          Filter Products:</FilterText>
          <Select name = "brand" onChange={handleFilters}>
            <Option defaultValue={"brand"}>Brand</Option> 
            <Option>gibson</Option>
            <Option>ibanez</Option>
            <Option>fender</Option>
            <Option>epiphone</Option>
            
          </Select>
          
        </Filter>

        <Filter>
          <FilterText>Sort Products: </FilterText>
            <Select onChange={(e) => setSort(e.target.value)}>
              <Option defaultValue={"regular"} value="regular">Regular</Option>
              <Option value="asc">Price (asc)</Option>
              <Option value="desc">Price (desc)</Option>
            </Select>
           
        </Filter>
      </FilterContainer>
      <Products cat={cat} filters={filters} sort={sort} />
     
      <Footer/>
     
    </Container>
  )
}

export default ProductList