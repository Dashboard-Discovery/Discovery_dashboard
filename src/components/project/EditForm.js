import React, { useState, useEffect } from "react";
import { saveResource, updateResource, getAllProjects } from '../Service/service';
import { getTokenNow } from '../../utils/useToken';
import DialogActions from '@mui/material/DialogActions';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import DialogContent from '@mui/material/DialogContent';
import PropTypes from 'prop-types';
import IconButton from '@mui/material/IconButton';
import Select from '@mui/material/Select';
import MenuItem from "@mui/material/MenuItem";
import styles from './grid.module.scss';

const AddEditForm = ({ formData, isUpdate, open, setOpen }) => {

  const [empNo, setEmpNo] = useState(0);
  const [projectName, setProjectName] = useState('');
  const [empName, setEmpName] = useState('');
  const [role, setRole] = useState('');
  const [experience, setExperience] = useState(0);
  const [skillSet, setSkillset] = useState('');
  const [billability, setBillability] = useState('');
  const [billingStartDate, setBillingStartDate] = useState();
  const [billingEndDate, setBillingEndDate] = useState();
  const [funnel, setFunnel] = useState(0);
  const [WON, setWON] = useState(0);
  const [telLocation, setTelLocation] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState(0);
  const [competency, setCompetency] = useState('');
  const [source, setSource] = useState('');
  const [grade, setGrade] = useState('');
  const [active, setActive] = useState(true);
  const [projectList, setProjectList] = useState([])
  const [users, setUser] = useState([])
  const billing = ['BILLABLE', 'NONBILLABLE'];
  

  const handleClose = () => {
    setOpen(false);
  }

  const handleSubmit = () => {

    const data = {
      "projectName": projectName,
    };

    function saveData() {
      const tokenNow = `Bearer ${getTokenNow()}`;
      console.log('token now is', tokenNow)
      let data = { projectName }
      // console.warn(data);
      fetch("http://10.75.80.111:8423/billing/v1/admin/project", {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': tokenNow
        },
        body: JSON.stringify(data)
      }).then((resp) => {
        // console.warn("resp",resp);;
        resp.json().then((result) => {
          console.warn("result", result)
          getUsers()
        })
      })
    }

    function updateUser() {
      const tokenNow = `Bearer ${getTokenNow()}`;
      console.log('token now is', tokenNow)
      let data = { projectName }
      console.warn("item", data)
  
      fetch(`http://10.75.80.111:8423/billing/v1/admin/project`, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': tokenNow
        },
        body: JSON.stringify(data)
      }).then((result) => {
        result.json().then((resp) => {
          console.warn(resp)
          getUsers()
        })
      })
    }

    if (!isUpdate) {
      console.log(data, '====')
      const response = saveData(data);
      if (response === '200' || 'OK') {
        setOpen(false);
      }
    } else {      
      const response = updateUser(data, formData?.id);
      if (response === '200' || 'OK') {
        setOpen(false);
      }

    }
  }

  useEffect(() => {
    getUsers();
  }, [])
  function getUsers() {
    const tokenNow = `Bearer ${getTokenNow()}`;
    console.log('token now is', tokenNow)

    fetch("http://10.75.80.111:8423/billing/v1/admin/project?projectName=Discovery", {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': tokenNow
      },
    }).then((result) => {
      result.json().then((resp) => {
        setUser(resp)
      })
    })
  }

  useEffect(() => {
    setProjectName(formData? formData?.projectName : '');
  }, [formData,open])
  

  return (
    <Dialog
      onClose={handleClose}
      open={open}
    >
      <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
        {isUpdate ? 'Update details' : 'Add new details'}
      </BootstrapDialogTitle>
      <DialogContent>
        <div className={styles.form_wrapper}>
        {isUpdate ? 
          <form>
            <div className='Input'>
              <select type="text" placeholder="Project" name="project" defaultValue={formData ? formData?.projectName : 'Select Project'}
                onChange={(e) => setProjectName(e.target.value)} >
                {projectList && (projectList.map((item) => {
                  return <option key={item?.id} value={item.projectName} selected={formData?.projectName == item.projectName ? true : false}>{item.projectName}</option>
                }))}
              </select>
              <label htmlFor="project">Project</label>
            </div>
          </form> 
          : 
          <form>
            <div className='Input'>
              <input type="text" placeholder="Project" name="project" value={projectName} 
                onChange={(e) => setProjectName(e.target.value)} >
              </input>
              <label htmlFor="project">Project</label>
            </div>
          </form>
          }
          
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        {/* <Button onClick={saveData}>Save</Button> */}
        {/* <Button onClick={updateUser} >Update User</Button> */}
        <Button onClick={handleSubmit}>Submit</Button>
        {/* <button onClick={saveData} >Save New User</button>
        {/* {isUpdate ? 
          <>
            <Button onClick={handleSubmit} >Submit</Button>
            <Button onClick={handleClose}>Cancel</Button>
          </>
          : 
          <>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSubmit}>Submit</Button>
          </>
        } */}
      </DialogActions>
    </Dialog>)

}

class Input extends React.Component {
  render() {
    return <div className='Input'>
      <input type={this.props.type} name={this.props.name} defaultValue={this.props.value} placeholder={this.props.placeholder} />
      <label htmlFor={this.props.name}>{this.props.placeholder}</label>
    </div>
  }
}


const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle className='text-center' sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default AddEditForm;