import React, { useState } from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/esm/Button';
import "../styling/register.css";
import axios from 'axios';
import {Link, Navigate } from 'react-router-dom';
import { useNavigate } from "react-router-dom"

 
function Login() {
  axios.defaults.withCredentials = true;
  const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [validationErrors, setValidationErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorText, setErrorText] = useState("");
 

    
    const loginAction = (event) => {
        event.preventDefault();
        let payload = {
            "email":email,
            "password":password
          }
          console.log(payload);
      
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
  return (
    <div class="container">
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