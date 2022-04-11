import React, { useState } from 'react';
import {ERROR} from '../../utils/constants';

async function loginUser(credentials) {
 return fetch('http://10.75.80.111:8423/billing/v1/admin/authenticate', {
   method: 'POST',
   headers: {
      'Accept': 'application/json',
     'Content-Type': 'application/json'
   },
   body: JSON.stringify(credentials)
 })
   .then(data => data.json());
   
}

export default function Login({ setToken }) {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  const [errorMessage, setErrorMessage] = useState();

  const handleSubmit = async e => {
    e.preventDefault();
    const params = { emailId: username, password: password };
   
    const result = await loginUser(params);
    if(result.token){
      setErrorMessage();
      setToken(result);
    }     
    else if(result.status === ERROR.UNAUTHORIZED){
      setErrorMessage(ERROR.UNAUTHORIZED + ':' + ERROR.UNAUTHORIZED_MESSAGE);
    }
  }

  return(
    <div className='Modal'>
      <h1 className='text-center'>Log In</h1>
      {errorMessage && <div className='text-center text-danger'>{errorMessage}</div>}
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
