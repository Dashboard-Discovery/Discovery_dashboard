import React, { useState } from 'react';
import PropTypes from 'prop-types';

async function loginUser(credentials) {
 return fetch('http://10.75.80.111:8423/billing/v1/admin/authenticate', {
   method: 'POST',
   headers: {
      'Accept': 'application/json',
     'Content-Type': 'application/json'
   },
   body: JSON.stringify(credentials)
 })
   .then(data => data.json())
   .catch(error => {      
      if (error.response?.status === 401) console.log(error.response.data.message);
      else console.log("Something went wrong. Please try again later.");
    })
}

export default function Login({ setToken }) {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async e => {
    e.preventDefault();
    const params = { emailId: 'jesi1@tataelxsi.co.in', password: 'Pass123' };
    // const options = {
    //      method: 'POST',
    //     headers: {
    //       'Accept': 'application/json',
    //       'Content-Type': 'application/json'
    //     },        
    //     body:  JSON.stringify(params)  
    // };
    // fetch('http://localhost:8080/login', options).then(response => {
     
    //   setToken(response.data.token);
    // }).catch(error => {
      
    //   if (error.response.status === 401) console.log(error.response.data.message);
    //   else console.log("Something went wrong. Please try again later.");
    // });
    const token = await loginUser(params);
    if(token)
     setToken(token);
  }

  return(
    <div className='Modal'>
      <h1 className='text-center'>Log In</h1>
      <form onSubmit={handleSubmit} className=''>
        <div className='Input'>         
          <input name='Username' placeholder = 'User name' type="text" onChange={e => setUserName(e.target.value)} />
          <label htmlFor='Username' ></label>
        </div>
        <div className='Input'>          
          <input name='Password' placeholder = 'Password' type="password" onChange={e => setPassword(e.target.value)} />
          <label htmlFor='Password' ></label>
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  )
}

// Login.propTypes = {
//   setToken: PropTypes.func.isRequired
// };
