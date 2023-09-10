import styled from 'styled-components'
import mobile  from '../responsive'
import { useState } from 'react'
import { login } from '../redux/apiCalls'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom";
import { loginFailure, loginStart } from "../redux/userRedux";

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    background: linear-gradient(
        rgba(255,255,255,0.4),
        rgba(255,255,255,0.1)
        ),
         url("https://wallpapercave.com/wp/KZYVwbF.jpg") center;
    background-size: cover;
    display: flex;
    align-items: center;
    justify-content: center;
`

const Wrapper = styled.div`
    padding: 2.0em;
    width: 25%;
    background-color: white;
    ${mobile({ width: "75%"})}
`

const Title = styled.h1`
    font-size: 1.7em;
    font-weight: 600;
`

const Form = styled.form`
    display: flex;
    flex-direction: column;
`



const Input = styled.input`
    flex: 1;
    min-width: 40%;
    margin: 0.9em 0 1em 0;
    padding: 1em;
    font-size: 0.9em;
`



const Button = styled.button`
    width: 40%;
    border: none;
    padding: 1em 2em;
    background-color: teal;
    color: white;
    cursor: pointer;
    font-weight: 600;
    font-size: 1em;
    margin-top: 0.5em;
    margin-bottom: 1.3em;

    &:disabled{
      color: green;
      cursor: not-allowed;
    }
`

const Link = styled.a`
    margin: 0.3em 0;
    font-size: 12px;
    text-decoration: underline;
    cursor: pointer;
    margin-bottom: 1em;
`



const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()
    const nav = useNavigate();
    const { isFetching, error } = useSelector((state) => state.user);

   
    const handleClick = async (e) => {
    e.preventDefault();
    dispatch(loginStart());

    try {
      const response = await login(dispatch, { email, password });
      if (response !== null) {
        nav("/");
      } else {
        dispatch(loginFailure());
        window.alert(
          "Invalid credentials. Please try again or create new account."
        );
      }
    } catch (error) {
      console.error(error);
      window.alert("An error occurred. Please try again.");
    }
  };
    
    const history = useNavigate();
    const handleHistory = () => {
      history("/register");
    };



  return (
    <Container>
        <Wrapper>
            <Title>SIGN IN</Title>
            <Form>
                <Input 
                placeholder="email" 
                onChange={(e) => setEmail(e.target.value)}
                />
                <Input 
                placeholder="password" 
                type="password" 
                onChange={(e) => setPassword(e.target.value)}
                />
                <Button onClick={handleClick} disabled={isFetching} to="/">LOGIN</Button>
               
                <Link>DO NOT YOU REMEMBER THE PASSWORD?</Link>
                <Link onClick={handleHistory}>CREATE A NEW ACCOUNT</Link>
            </Form>
        </Wrapper>
    </Container>
  )
}

export default Login;