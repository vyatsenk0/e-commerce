import styled  from "styled-components"
import { categories } from "../data"
import CategoryItem from "./CategoryItem"
import  mobile  from "../responsive"



const Container = styled.div`
    display: flex;
    flex-direction: column;
    height: 1000px;
    flex-wrap: wrap;
    padding: 2em;
    justify-content: space-between;
    background-image: url("https://wallpapercave.com/wp/wp3569640.jpg");
    background-size: cover;

    @media only screen and (max-width: 480px) {
    width: 100%;
    justify-content: center;
  }
`



const Categories = () => {
  return (
   
    <Container>
        {categories.map((item)=>(
            <CategoryItem item={item} key={item.id}></CategoryItem> 
        ))}
        
    </Container>
    
  )
  
}

export default Categories