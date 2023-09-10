import styled from 'styled-components'
import Product from './Product'
import axios from 'axios'
import { useEffect, useState } from 'react'

const Container = styled.div`
    padding: 2em;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: space-between;
`

const Products = ({cat, filters, sort}) => {
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get( 
           `https://gifted-wrap-seal.cyclic.app/api/products?category=${cat}` 
          );
        
        setProducts(res.data)
        
      } catch (err) {
        console.log(err)
      }
    }
    getProducts();
    
  }, [cat])



  useEffect(() => {
   
    cat && setFilteredProducts(
      
      products.filter((item) =>
        Object.entries(filters).every(([key, value]) =>
          item[key].includes(value)
        )
      )
    )
  }, [products, cat, filters])


  useEffect(() => {
    if(sort === "regular"){
      //
    }
    else if (sort === "asc"){
      setFilteredProducts((prev) => 
        [...prev].sort((a, b) => a.price - b.price)
      );
    } else{
      setFilteredProducts((prev) => 
      [...prev].sort((a, b) => b.price - a.price)
    );
    }
  }, [sort]);


  if (!products) {
    return <div style={{ marginTop: "4em" }}>Loading...</div>;
  }

  return (
    <Container>
        {filteredProducts.map((item) => (
            <Product key={item.id} item={item}  />
        ))}
    </Container>
  )
}

export default Products