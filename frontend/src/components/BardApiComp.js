
import React, { useState, useEffect } from 'react';
// import fetch from 'node-fetch';

import axios from 'axios';

function BardApiComp() {
    const [response, setResponse] = useState('');
    const [secure1PSIDValue, setSecure1PSIDValue] = useState('cgiU3m4qTag-dOirDZ9h-OYsJAjFI20FNte5uGtKmto5sKsXVW_D69juj4ctCXWh92TAHQ.');
  let response_id =1234;
  const baseURL = "https://jsonplaceholder.typicode.com/posts/1";
  
useEffect (
  () => {
    console.log("here");
    axios.get(baseURL).then((response) => {
      setResponse(response.data);
      console.log("here",response.data);
    })

  }, []
)
      
  
    // Your component JSX goes here
    return (
      <div style={{margin:'100px'}}>
        {response.title}"kk"
      </div>
    );
};

export default BardApiComp