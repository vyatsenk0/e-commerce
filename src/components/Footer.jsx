import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { SendOutlined } from "@material-ui/icons";
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';
import PinterestIcon from '@mui/icons-material/Pinterest';


const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-image: url("https://e0.pxfuel.com/wallpapers/114/840/desktop-wallpaper-dark-abstract.jpg");
  background-size: cover;
  color: rgb(206, 206, 205);
  padding: 2em;
  height: fit-content;

  @media only screen and (max-width: 480px) {
    width: 108%;
    padding: 1em;
  }
`;


const FooterContainer = styled.div`
  display: flex;

  @media only screen and (max-width: 480px) {
    flex-direction: column;
    padding: 1em;
    margin-left: 1em;
  }
`;

const List = styled.ul`
  list-style: none;
  margin-top: 30px;
`;


const ListItem = styled.li`
  font-family: "Teko", sans-serif;
  font-size: 1.5em;
  letter-spacing: 0.1em;
  margin: 0.5em 0;

  @media only screen and (max-width: 480px) {
    font-size: 1em;
  }
`;


const Left = styled.div`
  flex: 1;
  margin-top: 5em;
  margin-left: 5em;
`;



const Center = styled.div`
  flex: 1;
  margin-top: 5em;
  margin-left: 0em;
`;


const Right = styled.div`
  flex: 1;
  margin-top: 5em;
  margin-left: 5em;
  display: flex;
  flex-direction: column;
`;


const PrivacyContainer = styled.div`
  text-align: center;
  color: rgb(223, 223, 217);
  font-size: 1.0em;
  margin-top: 1em;
  font-weight: 300;
`;


const MediaContainer = styled.div`
  display: flex;
  margin: 0.5em 0em;
  margin-left: 70px;
  & > * {
    margin-right: 0.5em;
  }
`;


const MediaText = styled.div`
  margin-left: 5em;
`



const Description = styled.div`
  font-size: 1.0em;
  width: 60%;
  height: 5em;
 
  text-align: center;
  margin: 0.8em 0;
  color: rgb(178, 177, 177);

  @media only screen and (max-width: 480px) {
    font-size: 1em;
  }
`;


const InputContainer = styled.div`
  width: 30%;
  height: 3em;
  background: rgb(15, 15, 15);
  display: flex;
  justify-content: space-between;

  @media only screen and (max-width: 480px) {
    justify-content: space-evenly;
    width: 50%;
  }
`;


const Input = styled.input`
  border: 1px solid rgba(255, 255, 255, 0.3);
  background: transparent;
  flex: 8;
  padding-left: 1.5em;
  font-size: 1.2em;
  color: rgb(255, 255, 255);

  @media only screen and (max-width: 480px) {
    font-size: 0.8em;
  }
`;


const Button = styled.button`
  background: transparent;
  color: rgb(204, 203, 203);
  border: none;
  flex: 1;
`;


const Footer = () => {
  const [email, setEmail] = useState("");

const handleEmailChange = (e) => {
  setEmail(e.target.value);
};

const handleSubscribe = () => {
  axios
    .post("/send", { email })
    .then((res) => {
      console.log("Email sent: ", res.data);
      alert("Email sent: ", res.data);
    })
    .catch((error) => {
      console.log("Email sent");
      alert("Email sent");
    });
};


    return (
      <Container>
        <FooterContainer>
          <Left>
            <List>
            <ListItem>FAQ</ListItem>
            <ListItem>Imprint</ListItem>
            <ListItem>Contact us</ListItem>
            </List>
          </Left>
          <Center>
            <List>
            <ListItem>Privacy Notice</ListItem>
            <ListItem>Conditions of use</ListItem>
            <ListItem>Shipping & returns</ListItem>
            </List>
          </Center>
          <Right>
          <MediaText>SOCIAL MEDIA</MediaText>
            <MediaContainer>
              <InstagramIcon />
              <FacebookIcon />
              <YouTubeIcon />
              <PinterestIcon />
            </MediaContainer>


            <Description>
        Subscribe to our newsletter to get notifications about discounts and promotion for items from the cart
      </Description>
      <InputContainer>
        <Input
          placeholder="Enter Your Email..."
          value={email}
          onChange={handleEmailChange}
        />
        <Button onClick={handleSubscribe}>
          <SendOutlined />
        </Button>
      </InputContainer>
          </Right>
        </FooterContainer>
        <PrivacyContainer>COPYRIGHT © 2023 ALL RIGHTS RESERVED.</PrivacyContainer>
      </Container>
    );
  };
  
  export default Footer;