import Appbar from "../AppBar/AppBar";
import Sidebar from "../../AdminDash/SideBar/Sidebar";
import "./styles.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ResourceGrid from "../../ResourceGrid";
import Timesheet from "../../TimeSheet/Timesheet";
import BaseBilling from "../../BaseBilling";
import Reports from "../../Reports/Reports";
import Projects from "../../Projects";

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
            <Timesheet />
          </Route>
          <Route path="/billing"><BaseBilling /></Route>
          <Route path="/reports"><Reports /></Route>
          <Route path="/projects"><Projects /></Route>
        </Switch>
      </div>
    </Router>
  );
}
export default DashHome;
