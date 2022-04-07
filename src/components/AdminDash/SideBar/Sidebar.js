import {
    Container,
    Wrapper,
    SidebarMenu,
    Title,
    List,
    ListItem
  } from "./SidebarStyles";
  
  import {
    LineStyle,
    Timeline,
    TrendingUp,
    AttachMoney

  } from "@material-ui/icons";
  import { Link } from "react-router-dom";
  
  function Sidebar() {
    return (
      <Container>
        <Wrapper>
          <SidebarMenu className="test-class-side">
            <Title>Dashboard</Title>
            <List>
              <Link to='/timesheet'>
              <ListItem>
                <Timeline className="icon" />
                <div>TimeSheet</div>
              </ListItem>
              </Link>
             <Link to="resource-details">
              <ListItem>
                <TrendingUp className="icon" />
                <div>Resource Details</div>
              </ListItem>
              </Link>
              <Link to="/billing" className="link">
                <ListItem>
                  <AttachMoney className="icon" />
                  <div>Billing</div>
                </ListItem>
              </Link>
            </List>

          </SidebarMenu>
        </Wrapper>
      </Container>
    );
  }
  
  export default Sidebar;
  