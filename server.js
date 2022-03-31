const express = require('express');
const cors = require('cors')
const utils = require('./utils');
const bp = require('body-parser')
const app = express()
const port = 3000

app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))


app.use(cors());

// static user details
const userData = {
  empNo: "29233",
  password: "123456",
  name: "Abdul Waheed",
  username: "abdul",
  isAdmin: true
};
  

app.post('/login', (req, res) => {
   
    const user = req.body.username;
    const pwd = req.body.password;
  
    // return 400 status if username/password is not exist
    if (!user || !pwd) {
      return res.status(400).json({
        error: true,
        message: "Username or Password required."
      });
    }
  
    // return 401 status if the credential is not match.
    if (user !== userData.username || pwd !== userData.password) {
      return res.status(401).json({
        error: true,
        message: "Username or Password is Wrong."
      });
    }
  
    // // generate token
    // const token = utils.generateToken(userData);
    // // get basic user details
    // const userObj = utils.getCleanUser(userData);
    // // return the token along with user details
    return res.send({ token: 'user123' });
  });
  
app.listen(8080, () => console.log('API is running on http://localhost:8080/login'));
