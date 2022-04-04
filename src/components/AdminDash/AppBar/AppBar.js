import {
    Container,
    Wrapper,
    TopLeft,
    Logo
  } from "./AppbarStyles";
  
  function Appbar() {
    return (
      <Container>
        <Wrapper>
          <TopLeft>
            <Logo>Resource Management</Logo>
          </TopLeft>
        </Wrapper>
      </Container>
    );
  }
  
  export default Appbar;
  