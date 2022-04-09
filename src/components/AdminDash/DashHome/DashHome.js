import Appbar from "../AppBar/AppBar";
import Sidebar from "../../AdminDash/SideBar/Sidebar";
import "./styles.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ResourceGrid from "../../grid";
import BillingBase from "../../billing/BillingBase";
import ProjectInfo from "../../project/ProjectInfo"
import RoleInfo from "../../role/RoleInfo"

const DashHome = () => {
  return (
    <Router>
      <Appbar />
      <div className="container" style={{ maxWidth: '100%' }}>
        <Sidebar />
        <Switch>
          <Route path="/resource-details">
            <ResourceGrid />
          </Route>
          <Route path="/timesheet">
            <BillingBase />
          </Route>
          <Route path='/project'>
            <ProjectInfo />
          </Route>
          <Route path='/role'>
            <RoleInfo />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
export default DashHome;
