import React, { useState } from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/esm/Button';
import "../styling/register.css";
import axios from 'axios';
import {Link, Navigate } from 'react-router-dom';
import { useNavigate } from "react-router-dom"
function Register() {
  const navigate = useNavigate();
    const [register,setRegister] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [validationErrors, setValidationErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorText, setErrorText] = useState('');

    const handleClick = (event) =>
    {
     setRegister(!register);
    };
    const registerAction = (event) => {
        event.preventDefault();
        let payload = {
            "userName":name,
            "email":email,
            "password":password
          }
          console.log(payload);
      
      setIsSubmitting(true)
      setErrorText('');
      
      axios.post(process.env.REACT_APP_REGISTER_USER, payload ).then((res)=>{
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


    <><div class="container">
         <div className='loginCard'>
        <Form onSubmit={(e)=>registerAction(e)} >
            <h1 style={{ marginLeft: '54px' , color: 'white'}}>REGISTER</h1>
            <Form.Group className="mb-3"  data-bs-theme="dark">
                  <Form.Label>Name</Form.Label>
                  <Form.Control type="text" placeholder="Enter name" id ="name" name ="name" required value={name} onChange={(e)=>{setName(e.target.value)}} />
              </Form.Group>
              <Form.Group className="mb-3" data-bs-theme="dark">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control type="email" placeholder="Enter email" id ="email" name='email' required value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
                  <Form.Text className="text-muted">
                      We'll never share your email with anyone else.
                  </Form.Text>
              </Form.Group>
              <Form.Group className="mb-3" data-bs-theme="dark">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="Password" id = 'password' name = 'name'  requiredvalue={password} onChange={(e)=>{setPassword(e.target.value)}}/>
              </Form.Group>
              <p className='errorText'>{errorText}</p>
              <Form.Group className="mb-3" controlId="formBasicCheckbox" data-bs-theme="dark">
                  {/* <Form.Check type="checkbox" label="Check me out" /> */}
                  <p onClick={handleClick} style={{ cursor: 'pointer', color: 'blue' }}>Already an User? <Link to="/">Log in here</Link></p>
              </Form.Group>
              
              {/* <Button style={{ marginLeft: '108px' }} variant="primary" type="submit" data-bs-theme="dark"  disabled = {isSubmitting}>
                  Register
              </Button> */}
              <button 
                                        disabled={isSubmitting}
                                        type="submit"
                                        className="btn btn-primary btn-block">Register Now
                                    </button>
          </Form>
        </div>
        
        

      </div></>
  )
}

export default Register