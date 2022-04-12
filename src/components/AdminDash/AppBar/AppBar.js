import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "../../login/login";
import {
    Container,
    Wrapper,
    TopLeft,
    TopRight,
    Logo
  } from "./AppbarStyles";

  
  function Appbar() {

    const logout = () =>{
        localStorage.removeItem('token');
        window.location.href = '/';
    }

    return (
      <Container>
        <Wrapper>
          <TopLeft>
            <Logo>Resource Management</Logo>
          </TopLeft>
          <TopRight>
            <button className="btn btn-primary" onClick={(e)=> logout()}>Log out</button>
          </TopRight>
        </Wrapper>
      </Container>
    );
  }
  
  export default Appbar;
  