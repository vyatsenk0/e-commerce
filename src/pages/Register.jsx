import styled from 'styled-components'
import mobile  from '../responsive'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { register } from "../redux/apiCalls";



const Container = styled.div`
    width: 100vw;
    height: 100vh;
    background: linear-gradient(
        rgba(255,255,255,0.3),
        rgba(255,255,255,0.1)
        ),
         url("https://wallpaperaccess.com/full/1078877.jpg") center;
    background-size: cover;
    display: flex;
    align-items: center;
    justify-content: center;
`

const Wrapper = styled.div`
    padding: 2em;
    width: 40%;
    background-color: white;
    ${mobile({ width: "75%"})}
`

const Title = styled.h1`
    font-size: 2em;
    font-weight: 500;
`

const Form = styled.form`
    display: flex;
    flex-wrap: wrap;
    
`



const Input = styled.input`
    flex: 1;
    min-width: 40%;
    margin: 2em 1em 0 0;
    padding: 0.9em;
    font-weight: 400;
`

const Agreement = styled.span`
    font-size: 0.9em;
    margin: 2em 0;
`

const Button = styled.div`
    width: 9em;
    text-align: center;
    border: none;
    padding: 0.5em 1.1em;
    background-color: teal;
    color: white;
    cursor: pointer;
    font-weight: 500;
    font-size: 1.25em;
`

const Register = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const history = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    register(dispatch, { firstName, lastName, email, password });
    history("/login");
  };


  return (
    <Container>
        <Wrapper>
            <Title>CREATE AN ACCOUNT</Title>
            <Form>
          <Input
            placeholder="First Name"
            onChange={(e) => setFirstName(e.target.value)}
          />
          <Input
            placeholder="Last Name"
            onChange={(e) => setLastName(e.target.value)}
          />
          <Input
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            placeholder="Password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Input placeholder="Confirm Password" type="password" />
          <Agreement>
            By creating an account, I consent to the processing of my personal
            data in accordance with the Privacy Policy.
          </Agreement>
          <Button onClick={handleClick} path="/login">
            Create
          </Button>
        </Form>
        </Wrapper>
    </Container>
  )
}

export default Register