import React from 'react';
import ResourceGrid from '../components/grid';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import BillingBase from '../components/billing/BillingBase';
import { getUser, removeUserSession } from '../utils/Common';

import 'react-tabs/style/react-tabs.css';
  
export default function Dashboard(props) {
  const user = getUser();
  const handleLogout = () => {
    removeUserSession();
    props.history.push('/login');
  }

    return (
      <div className="App">
        {/* <div>
          Welcome {user.name}!<br /><br />
          <input type="button" onClick={handleLogout} value="Logout" />
        </div> */}
        <Tabs>
          <TabList>
            <Tab>Resource Details</Tab>
            <Tab>Time Sheet</Tab>
          </TabList>  
          <TabPanel>
            <ResourceGrid />
          </TabPanel>
          <TabPanel>
            <BillingBase />
          </TabPanel>
        </Tabs>
  
      </div>
    );
  }
