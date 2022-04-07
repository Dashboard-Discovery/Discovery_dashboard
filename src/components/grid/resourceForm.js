import React, { useState } from "react";
import { saveResource } from '../Service/service';

import DialogActions from '@mui/material/DialogActions';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import DialogContent from '@mui/material/DialogContent';
import PropTypes from 'prop-types';
import IconButton from '@mui/material/IconButton';
import styles from './grid.module.scss';

const AddEditForm = ({ formData, isUpdate, open, setOpen }) =>  {

  const [empNo, setEmpNo] = useState();

const [projectName,setProjectName] = useState();
const [empName, setEmpName] = useState();
const [role, setRole] = useState();
const [experience, setExperience] = useState();
const [skillSet,  setSkillset] = useState();
const [billability, setBillability ] = useState();
const [billingStartDate,  setBillingStartDate] = useState();
const [billingEndDate,  setBillingEndDate] = useState();
const [funnel, setFunnel] = useState();
const [won,  setWON] = useState();
const [telLocation, setTelLocation ] = useState();
const [email,  setEmail] = useState();
const [mobile,  setMobile] = useState();
const [competency,  setCompetency] = useState();
const [source, setSource] = useState();
const [grade,  setGrade] = useState();
const [active, setActive] = useState();

  const handleClose = () => {
    setOpen(false);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    debugger;
    const data = {
      "empNo": empNo,
      "projectName": projectName,
      "empName": empName,
      "role": role,
      "experience": e.target[4].value,
      "skillSet": e.target[5].value,
      "billability": e.target[6].value,
      "email": e.target[12].value
    }
    if(!isUpdate) {
      const response=saveResource(data);
        if(response==='200' || 'OK'){
          setOpen(false);
        }
    }
  }
  
  return (
    <Dialog
    onClose={handleClose}
    open={open}
>
    <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
        {isUpdate ? 'Update details' : 'Add new details'}
    </BootstrapDialogTitle>
    <DialogContent>
  <div className= {styles.form_wrapper}>
    <form>
      <Input type="text" placeholder="Project" name="project" value={formData ? formData.project : ''} />
      <Input type="text" placeholder="Emp Number" name="empNo" value={formData ? formData.empNo : ''} />
      <Input type="text" placeholder="Name" name="name" value={formData ? formData.name : ''} />
      <Input type="text" placeholder="Role" name="role" value={formData ? formData.role : ''} />
      <Input type="text" placeholder="Experience" name="experience" value={formData ? formData.experience : ''} />
      <Input type="text" placeholder="Skill set" name="experience" value={formData ? formData.skillSet : ''} />
      <Input type="text" placeholder="Billability" name="experience" value={formData ? formData.billability : ''} />
      <Input type="date" placeholder="Billing start date" name="experience" />
      <Input type="date" placeholder="Billing end date" defaultValue="31-12-2022" />
      <Input type="text" placeholder="WON" name="won" value={formData ? formData.WON : ''} />
      <Input type="text" placeholder="TEL location" name="tellocation" value={formData ? formData.tellocation : ''} />
      <Input type="email" placeholder="Email" name="email" value={formData ? formData.email : ''} />
      <Input type="text" placeholder="Mobile" name="mobile" value={formData ? formData.mobile : ''} />
      <Input type="text" placeholder="Competency" name="competency" value={formData ? formData.competency : ''} />
      <Input type="text" placeholder="Source" name="source" value={formData ? formData.source : ''} />
      <Input type="text" placeholder="Grade" name="grade" value={formData ? formData.grade : ''} />
      
    </form>
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
              <input type={ this.props.type } name={ this.props.name } defaultValue={this.props.value} placeholder={ this.props.placeholder }/>
              <label htmlFor={ this.props.name }>{ this.props.placeholder }</label>
           </div>
  }
}


const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
      <DialogTitle classes='text-center' sx={{ m: 0, p: 2 }} {...other}>
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