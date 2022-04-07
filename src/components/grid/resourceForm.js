import React, { useState, useEffect} from "react";
import { saveResource, updateResource, getAllProjects} from '../Service/service';

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

  const [empNo, setEmpNo] = useState();
  const [projectName, setProjectName] = useState();
  const [empName, setEmpName] = useState();
  const [role, setRole] = useState();
  const [experience, setExperience] = useState();
  const [skillSet, setSkillset] = useState();
  const [billability, setBillability] = useState();
  const [billingStartDate, setBillingStartDate] = useState();
  const [billingEndDate, setBillingEndDate] = useState();
  const [funnel, setFunnel] = useState();
  const [WON, setWON] = useState();
  const [telLocation, setTelLocation] = useState();
  const [email, setEmail] = useState();
  const [mobile, setMobile] = useState();
  const [competency, setCompetency] = useState();
  const [source, setSource] = useState();
  const [grade, setGrade] = useState();
  const [active, setActive] = useState();  
  const [projectList,setProjectList]=useState([])

  const handleClose = () => {
    setOpen(false);
  }

  const handleSubmit = () => {
    
     const data = {
      "empNo": empNo,
      "projectName": projectName,
      "empName": empName,
      "role": role,
      "experience": experience,
      "skillSet": skillSet,
      "billability": billability,
      "email": email
    };
    
    if (!isUpdate) {
      const response = saveResource(data);
      if (response === '200' || 'OK') {
        setOpen(false);
      }
    } else {
      
        const response = updateResource(data, formData?.id);
        if (response === '200' || 'OK') {
          setOpen(false);
        }
      
    }
  }

  useEffect(async()=>{
    const responseProject= await getAllProjects();                                                                                                                                                                                  
    setProjectList(responseProject);
    console.log('project list is',projectList)                                                                                                                                                                        
  },[])

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
          <form>
          <div className='Input'>             
              <Select type="text" placeholder="Project" name="project" defaultValue={formData?.projectName}
                onChange={(e) => setProjectName(e.target.value)} >
                {projectList && (projectList.map((item) => {
                  return <MenuItem key={item?.id} value={item.projectName} selected={formData?.projectName == item.projectName ? true : false}>{item.projectName}</MenuItem>
                }))}
              </Select>
              <label htmlFor="project">Project</label>
            </div>
            <div className='Input'>
              <input type="text" placeholder="Emp Number" name="empNo" defaultValue={formData?.empNo}
                onChange={(e) => setEmpNo(e.target.value)} />
              <label htmlFor="empNo">Employee Num</label>
            </div>
            <div className='Input'>
              <input type="text" placeholder="Emp Name" name="empName" defaultValue={formData?.empName}
                onChange={(e) => setEmpName(e.target.value)} />
              <label htmlFor="empName">Emp Name</label>
            </div>
            <div className='Input'>
              <input type="text" placeholder="Role" name="role" defaultValue={formData?.role}
                onChange={(e) => setRole(e.target.value)} />
              <label htmlFor="role">Role</label>
            </div>
            <div className='Input'>
              <input type="text" placeholder="Experience" name="experience" defaultValue={formData?.experience}
                onChange={(e) => setExperience(e.target.value)} />
              <label htmlFor="Experience">Experience</label>
            </div>
            <div className='Input'>
              <input type="text" placeholder="Skill set" name="skillSet" defaultValue={formData?.skillSet}
                onChange={(e) => setSkillset(e.target.value)} />
              <label htmlFor=""></label>
            </div>
            <div className='Input'>
              <input type="text" placeholder="Billability" name='billability' defaultValue={formData?.billability}
                onChange={(e) => setBillability(e.target.value)} />
              <label htmlFor=""></label>
            </div>
            <div className='Input'>
              <input type="date" placeholder="Billing start date" name="billingStartDate" defaultValue={formData?.billingStartDate}
                onChange={(e) => setBillingStartDate(e.target.value)} />
              <label htmlFor="billingStartDate">Billing start date</label>
            </div>
            <div className='Input'>
              <input type="date" placeholder="Billing end date" name="billingEndDate" defaultValue={formData?.billingEndDate}
                onChange={(e) => setBillingEndDate(e.target.value)} />
              <label htmlFor="billingEndDate">Billing end date</label>
            </div>
            <div className='Input'>
              <input type="text" placeholder="WON" name="won" defaultValue={formData?.WON}
                onChange={(e) => setProjectName(e.target.value)} />
              <label htmlFor="won">WON</label>
            </div>
            <div className='Input'>
              <input type="text" placeholder="TEL location" name="tellocation" defaultValue={formData?.telLocation}
                onChange={(e) => setTelLocation(e.target.value)} />
              <label htmlFor="tellocation">TEL location</label>
            </div>
            <div className='Input'>
              <input type="email" placeholder="Email" name="email" defaultValue={formData?.email}
                onChange={(e) => setEmail(e.target.value)} />
              <label htmlFor="email">email</label>
            </div>
            <div className='Input'>
              <input type="text" placeholder="Mobile" name="mobile" defaultValue={formData?.mobile}
                onChange={(e) => setMobile(e.target.value)} />
              <label htmlFor="mobile">Mobile</label>
            </div>
            <div className='Input'>
              <input type="text" placeholder="Competency" name="competency" defaultValue={formData?.competency}
                onChange={(e) => setCompetency(e.target.value)} />
              <label htmlFor="competency">Competency</label>
            </div>
            <div className='Input'>
              <input type="text" placeholder="Source" name="source" defaultValue={formData?.source}
                onChange={(e) => setSource(e.target.value)} />
              <label htmlFor="source">Source</label>
            </div>
            <div className='Input'>
              <input type="text" placeholder="Grade" name="grade" defaultValue={formData?.grade}
                onChange={(e) => setGrade(e.target.value)} />
              <label htmlFor="grade">Grade</label>
            </div>
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
      <input type={this.props.type} name={this.props.name} defaultValue={this.props.value} placeholder={this.props.placeholder} />
      <label htmlFor={this.props.name}>{this.props.placeholder}</label>
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