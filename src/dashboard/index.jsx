import React from 'react';
import ResourceGrid from '../components/grid';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import BillingBase from '../components/billing/BillingBase';
import { getUser, removeUserSession } from '../utils/Common';
import DashHome from '../components/AdminDash/DashHome/DashHome'

import 'react-tabs/style/react-tabs.css';
  
export default function Dashboard(props) {
  const user = getUser();
  const handleLogout = () => {
    removeUserSession();
    props.history.push('/login');
  }

    return (
      <div className="App">
        <DashHome/>
      </div>
    );
  }
