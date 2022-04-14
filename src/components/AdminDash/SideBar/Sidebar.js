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
    AttachMoney,

  } from "@material-ui/icons";
  import SummarizeIcon from '@mui/icons-material/Summarize';
  import { Link } from "react-router-dom";
  
  function Sidebar() {
    return (
      <Container>
        <Wrapper>
          <SidebarMenu className="test-class-side">
            <Title>Dashboard</Title>
            <List>
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
              <Link to="/billing">
                <ListItem>
                  <AttachMoney className="icon" />
                  <div>Billing</div>
                </ListItem>
              </Link>
              <Link to="projects">
                <ListItem>
                  <SummarizeIcon className="icon" />
                  <div>Projects</div>
                </ListItem>
              </Link>
              <Link to="/reports">
                <ListItem>
                  <SummarizeIcon className="icon" />
                  <div>Reports</div>
                </ListItem>
              </Link>
            </List>
   
            </List>
            {/* <Title>Quick Menu</Title>
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
              </ListItem> 
            </List>
            <Title>Notifications</Title> */}
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
  