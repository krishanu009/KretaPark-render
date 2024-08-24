import React, { useState, useContext, useEffect,useRef } from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/esm/Button';
import "../styling/register.css";
import axios from 'axios';
import {Link, Navigate } from 'react-router-dom';
import { useNavigate } from "react-router-dom"
import { ThemeContext } from "../context/ThemeContext";

 
function Login() {
  const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [validationErrors, setValidationErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorText, setErrorText] = useState("");
    const { theme, setTheme } = useContext(ThemeContext);
    const [emailButtonText, setEmailButtonText] = useState('Copy');
    const [passwordButtonText, setPasswordButtonText] = useState('Copy');
 useEffect(() => {
  fetchAndSetLocalData();
 },[])

    
    const loginAction = (event) => {
        event.preventDefault();
        let payload = {
            "email":email,
            "password":password
          }
          //console.log(payload);
      
      setIsSubmitting(true)
      setErrorText('');
      
      axios.post(process.env.REACT_APP_LOGIN_USER, payload ).then((res)=>{
        setIsSubmitting(false);
        console.log("y",res.data);
        localStorage.setItem('token', res.data.accesToken)
        
        navigate("/dashboard");
      }).catch((e)=> {
        setIsSubmitting(false);
        // alert(e.data.errors);
        console.log("N",e);
        setErrorText(e.response.data.message);
      })
    };

    const fetchAndSetLocalData = () => {
      let localInfo = JSON.parse(localStorage.getItem('userInfo'));
       if(localInfo)
        {
          console.log("localinfo",localInfo);
          setTheme(localInfo.theme);
  
        }
    }

    const textRef = useRef(null);

   
  
    const copyToClipboard = (text, setButtonText) => {
      navigator.clipboard.writeText(text).then(() => {
        setButtonText('Copied');
        setTimeout(() => {
          setButtonText('Copy');
        }, 3000);
      }).catch(err => {
        console.error('Could not copy text: ', err);
      });
    };
    return (
      <div class="container">
        <div className="loginInfo">
          <p>Login Info</p>
          <div className="infoRow">
            <p>Email: jhon1@test.com</p>
            {/* <button onClick={() => copyToClipboard('jhon1@test.com', setEmailButtonText)}>
            {emailButtonText}
            </button> */}
  
            <button onClick={() => copyToClipboard('jhon1@test.com', setEmailButtonText)} class="Btn">
    <span class="text">{emailButtonText}</span>
    <span class="svgIcon">
      <svg fill="white" viewBox="0 0 384 512" height="1em" xmlns="http://www.w3.org/2000/svg"><path d="M280 64h40c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128C0 92.7 28.7 64 64 64h40 9.6C121 27.5 153.3 0 192 0s71 27.5 78.4 64H280zM64 112c-8.8 0-16 7.2-16 16V448c0 8.8 7.2 16 16 16H320c8.8 0 16-7.2 16-16V128c0-8.8-7.2-16-16-16H304v24c0 13.3-10.7 24-24 24H192 104c-13.3 0-24-10.7-24-24V112H64zm128-8a24 24 0 1 0 0-48 24 24 0 1 0 0 48z"></path></svg>
    </span>
  </button>
          </div>
          <div className="infoRow">
            <p>Password: test123</p>
            {/* <button onClick={() => copyToClipboard('test123', setPasswordButtonText)}>
              {passwordButtonText}
            </button> */}
  
  <button onClick={() => copyToClipboard('test123', setPasswordButtonText)} class="Btn">
    <span class="text">{passwordButtonText}</span>
    <span class="svgIcon">
      <svg fill="white" viewBox="0 0 384 512" height="1em" xmlns="http://www.w3.org/2000/svg"><path d="M280 64h40c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128C0 92.7 28.7 64 64 64h40 9.6C121 27.5 153.3 0 192 0s71 27.5 78.4 64H280zM64 112c-8.8 0-16 7.2-16 16V448c0 8.8 7.2 16 16 16H320c8.8 0 16-7.2 16-16V128c0-8.8-7.2-16-16-16H304v24c0 13.3-10.7 24-24 24H192 104c-13.3 0-24-10.7-24-24V112H64zm128-8a24 24 0 1 0 0-48 24 24 0 1 0 0 48z"></path></svg>
    </span>
  </button>
          </div>
        </div>
      <div className='loginCard'>
          <Form onSubmit={(e)=>loginAction(e)}>
              <h1 style={{ marginLeft: '82px' , color: 'white'}}>LOGIN</h1>
                <Form.Group className="mb-3" controlId="formBasicEmail" data-bs-theme="dark">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email"  required onChange={(e)=>{setEmail(e.target.value)}}/>
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>
  
                <Form.Group className="mb-3" controlId="formBasicPassword" data-bs-theme="dark">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password"  required onChange={(e)=>{setPassword(e.target.value)}}/>
                </Form.Group>
                <p className='errorText'>{errorText}</p>
                <Form.Group className="mb-3" controlId="formBasicCheckbox" data-bs-theme="dark">
                    {/* <Form.Check type="checkbox" label="Check me out" /> */}
                    <p  style={{ cursor: 'pointer', color: 'blue' }}>Don't have account? <Link to="/register">Register here</Link></p>
                </Form.Group>
                
                <Button style={{ marginLeft: '108px' }} variant="primary" type="submit" data-bs-theme="dark" disabled = {isSubmitting}>
                    Log In
                </Button>
            </Form>
          </div>
          </div>
    )
}

export default Login