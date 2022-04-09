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
    Group,
    Info,
    Storefront,
    AttachMoney,
    BarChart,
    MailOutline,
    DynamicFeed,
    ChatBubbleOutline,
    WorkOutline
  } from "@material-ui/icons";
  import { Link } from "react-router-dom";
  
  function Sidebar() {
    return (
      <Container>
        <Wrapper>
          <SidebarMenu className="test-class-side">
            <Title>Dashboard</Title>
            <List>
                <ListItem>
                  <LineStyle className="icon" />
                  <div>Home</div>
                </ListItem>
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
              <Link to="/project" className="link">
                <ListItem>
                  <TrendingUp className="icon" />
                  <div>project</div>
                </ListItem>
              </Link>
              <Link to="/role" className="link">
                <ListItem>
                  <TrendingUp className="icon" />
                  <div>role</div>
                </ListItem>
              </Link>
              {/* <Link to="/users" className="link">
                <ListItem>
                  <Group className="icon" />
                  <div>Users</div>
                </ListItem>
              </Link> */}
            </List>
            <Title>Quick Menu</Title>
            <List>
              <ListItem>
                <Info className="icon" />
                <div>About</div>
              </ListItem>
              {/* <Link to="/products" className="link"> */}
                {/* <ListItem>
                  <Storefront className="icon" />
                  <div>Products</div>
                </ListItem>
              </Link>
              <ListItem>
                <AttachMoney className="icon" />
                <div>Transactions</div>
              </ListItem> */}
              {/* <ListItem>
                <BarChart className="icon" />
                <div>Reports</div>
              </ListItem> */}
            </List>
            <Title>Notifications</Title>
            {/* <List>
              <ListItem>
                <MailOutline className="icon" />
                <div>Mail</div>
              </ListItem>
              <ListItem>
                <DynamicFeed className="icon" />
                <div>Feedback</div>
              </ListItem>
              <ListItem>
                <ChatBubbleOutline className="icon" />
                <div>Messages</div>
              </ListItem>
              <ListItem>
                <WorkOutline className="icon" />
                <div>Manage</div>
              </ListItem>
            </List> */}
          </SidebarMenu>
        </Wrapper>
      </Container>
    );
  }
  
  export default Sidebar;
  