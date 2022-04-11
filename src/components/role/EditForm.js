import React, { useState, useEffect } from "react";
import { saveResource, updateResource, getAllProjects, getAllCountries, updateProjectMaster, saveProjectMaster } from '../Service/service';
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
  const [countryName, setCountryName] = useState('');
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
  const [countryList, setCountryList] = useState([])
  const [users, setUser] = useState([])
  const billing = ['BILLABLE', 'NONBILLABLE'];
  

  const handleClose = () => {
    setOpen(false);
  }

  const handleSubmit = () => {
    const data = {
      "projectName": projectName,
      "countryName": countryName
    };

    // useEffect(async () => {
    //   const updateProject = await updateProjectMaster();
    //   setProject(updateProject);
    //   console.log('project list is', projectList)
    // }, [])

    if (!isUpdate) {
      console.log(data, '====')
      const response = saveProjectMaster(data);
      if (response === '200' || 'OK') {
        setOpen(false);
      }
    } else {      
      const response = updateProjectMaster(data, formData?.id);
      if (response === '200' || 'OK') {
        setOpen(false);
      }
    }
  }

  useEffect(async () => {
    const responseProject = await getAllProjects();
    setProjectList(responseProject);
    console.log('project list is', projectList)
  }, [])

  useEffect(async () => {
    const responseCountry = await getAllCountries();
    setCountryList(responseCountry);
    console.log('project list is', projectList)
  }, [])
  
  useEffect(() => {
    setProjectName(formData? formData?.projectName : '');
    setCountryName(formData? formData?.countryName : '');
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
            <div className='Input'>
              <select type="text" placeholder="country" name="country" defaultValue={formData ? formData?.countryName : 'Select Country'}
                onChange={(e) => setCountryName(e.target.value)} >
                {countryList && (countryList.map((item) => {
                  return <option key={item?.id} value={item.countryName} selected={formData?.countryName == item.countryName ? true : false}>{item.countryName}</option>
                }))}
              </select>
              <label htmlFor="country">Country</label>
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
            <div className='Input'>
              <select type="text" placeholder="country" name="country" defaultValue={formData ? formData?.countryName : 'Select Country'}
                onChange={(e) => setCountryName(e.target.value)} >
                {countryList && (countryList.map((item) => {
                  return <option key={item?.id} value={item.countryName} selected={formData?.countryName == item.countryName ? true : false}>{item.countryName}</option>
                }))}
              </select>
              <label htmlFor="country">Location</label>
            </div>
          </form>
          }
          
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit}>Submit</Button>
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