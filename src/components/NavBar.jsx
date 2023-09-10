import React from 'react'
import { styled } from 'styled-components'

import { ShoppingCartOutlined } from '@mui/icons-material';
import { Badge } from '@material-ui/core';
import mobile from '../responsive'

import {useDispatch, useSelector} from "react-redux"
import { useNavigate } from 'react-router-dom';
import { logout } from "../redux/userRedux";
import { clearCart } from "../redux/cartRedux";

import MusicNoteIcon from '@mui/icons-material/MusicNote';


const Container = styled.div`
    height: 9vh;
    background-image: linear-gradient(to bottom, rgba(250, 0,0,0), #bebbbb);
    ${mobile({ height: "50px" })}
    
`

const Wrapper = styled.div`
    padding: 0.6em 1.2em;
    display: flex;
    justify-content: space-between;
    align-items: center;
    ${mobile({ padding: "10px 0px" })}
    
    height: 50px;
`;







const Center = styled.div`
    flex: 1;
    text-align: center;
    margin-right: 50em;
    margin-bottom: 0.5em;
    width: 100%;
    
`

const Logo = styled.a`
    margin-right: 2em;
    width: 15em;
    font-weight: 900;
    text-decoration: none;
    color: black;
    font-size: 29px;
    text-align: center;
    
    cursor: pointer;
    ${mobile({ fontSize: "24px" })}
    
`



// 
const Right = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-bottom: 0.4em;
    margin-right: 0.5em;
    ${mobile({ justifyContent: "center", flex: 2 })}
    
`


const Menu = styled.div`
    font-size: 22px;
    font-weight: 800;
    cursor: pointer;
    margin-left: 1.2em;
    ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`



const StyledBadge = styled(Badge)({
  "& .MuiBadge-badge": {
    color: "black",
    backgroundColor: "orange",
    fontSize: "14px",
    fontWeight: "bold",
  }
});




const Navbar = () => {
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user);
  const login = useNavigate();
  const register = useNavigate();
  const home = useNavigate();
  const cartPage = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearCart());
  };

  return (
    <Container>
      <Wrapper>
      
        <Center>
        <MusicNoteIcon fontSize='medium'/>
        <Logo
            onClick={() => {
              home("/");
            }}
          >
            
          Resonance Realm
          </Logo>
        
          
        </Center>
        <Right>
          {user.currentUser ? (
            <>
              <Menu>{user.currentUser.firstName}</Menu>
              <Menu onClick={handleLogout}>Sign-out</Menu>
            </>
          ) : (
            <>
              <Menu
                onClick={() => {
                  register("/register");
                }}
              >
                Register
              </Menu>
              <Menu
                onClick={() => {
                  login("/login");
                }}
              >
                Login
              </Menu>
            </>
          )}

          <Menu>
            <StyledBadge overlap="rectangular"  badgeContent={cart.quantity} color="y">
              <ShoppingCartOutlined
                onClick={() => {
                  cartPage("/cart");
                }}
                style={{ fontSize: 30 }}
              />
            </StyledBadge>
           
          </Menu>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;