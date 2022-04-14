import React, { useState, useEffect } from "react";
import { saveResource, updateResource, getAllProjects, getAllRoles } from '../Service/service';

import DialogActions from '@mui/material/DialogActions';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import DialogContent from '@mui/material/DialogContent';
import PropTypes from 'prop-types';
import IconButton from '@mui/material/IconButton';
import { ConvertDate } from '../../utils/Common';
import styles from './grid.module.scss';

const AddEditForm = ({ formData, isUpdate, open, setOpen, handleReload }) => {

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
  const [status, setStatus] = useState('');
  const [projectList, setProjectList] = useState([]);
  const [roleList, setRoleList] = useState([])
  const billing = ['BILLABLE', 'NONBILLABLE'];
  const statusList = ['ACTIVE', 'INACTIVE'];

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
      "billingStartDate": new Date(billingStartDate),
      "billingEndDate": new Date(billingEndDate),
      "funnel": funnel,
      "won": WON,
      "telLocation": telLocation,
      "email": email,
      "mobile": mobile,
      "competency": competency,
      "source": source,
      "grade": grade,
      "status": status
    };

    if (!isUpdate) {
      console.log(data, '====')
      const response = saveResource(data);
      if (response === '200' || 'OK') {
        setOpen(false);
        handleReload()
      }
    } else {
      const response = updateResource(data, formData?.id);
      if (response === '200' || 'OK') {
        setOpen(false);
        handleReload();
      }

    }
  }

  useEffect(async () => {
    const responseProject = await getAllProjects();
    setProjectList(responseProject);
    const responseRole = await getAllRoles();
    setRoleList(responseRole);
  }, [])

  useEffect(() => {
    setProjectName(formData ? formData?.projectName : '');
    setEmpNo(formData ? formData?.empNo : '');
    setEmpName(formData ? formData?.empName : "");
    setRole(formData ? formData?.role : '');
    setExperience(formData ? formData?.experience : '');
    setSkillset(formData ? formData?.skillSet : '');
    setBillability(formData ? formData?.billability : 'BILLABLE');
    setBillingStartDate(formData ? formData?.billingStartDate : '');
    setBillingEndDate(formData ? formData?.billingEndDate : '');
    setWON(formData ? formData?.WON : '');
    setFunnel(formData ? formData?.setFunnel : '');
    setTelLocation(formData ? formData?.telLocation : '');
    setEmail(formData ? formData?.email : '');
    setMobile(formData ? formData?.mobile : '');
    setCompetency(formData ? formData?.competency : '');
    setSource(formData ? formData?.source : '');
    setGrade(formData ? formData?.grade : '');
    setStatus(formData ? formData?.status : 'ACTIVE');
  }, [formData, open])


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
              <select type="text" placeholder="Project" name="project" defaultValue={formData ? formData?.projectName : 'default'}
                onChange={(e) => setProjectName(e.target.value)} >
                  <option value={'default'} disabled>Choose an option</option>
                {projectList && (projectList.map((item) => {
                  return <option key={item?.id} value={item.projectName} selected={formData?.projectName == item.projectName ? true : false}>{item.projectName}</option>
                }))}
              </select>
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
              <select type="text" placeholder="Role" name="role" defaultValue={formData? formData.role: 'default'} 
                onChange={(e) => setRole(e.target.value)} >
                  <option value={'default'} disabled>Choose an option</option>
                {roleList && (roleList.map((item) => {
                  return <option key={item?.id} value={item.role} selected={formData?.role == item.role ? true : false}>{item.role}</option>
                }))}
              </select>
              <label htmlFor="project">Role</label>
            </div>
            <div className='Input'>
              <input type="text" placeholder="Experience" name="experience" defaultValue={formData?.experience}
                onChange={(e) => setExperience(e.target.value)} />
              <label htmlFor="Experience">Experience</label>
            </div>
            <div className='Input'>
              <input type="text" placeholder="Skill set" name="skillSet" defaultValue={formData?.skillSet}
                onChange={(e) => setSkillset(e.target.value)} />
              <label htmlFor="skillSet">Skill Set</label>
            </div>
            <div className='Input'>
              <select type="text" placeholder="Billability" name="billability" defaultValue={formData ? formData?.billability : 'default'}
                onChange={(e) => setBillability(e.target.value)} >
                  <option value={'default'} disabled>Choose an option</option>
                {billing && (billing.map((item) => {
                  return <option key={item} value={item} selected={formData?.billability == item ? true : false}>{item}</option>
                }))}
              </select>
              <label htmlFor="billability">Billability</label>
            </div>
            <div className='Input'>
              <input type="date" placeholder="Billing start date" name="billingStartDate" defaultValue={ConvertDate(formData?.billingStartDate)}
                onChange={(e) => setBillingStartDate(e.target.value)} />
              <label htmlFor="billingStartDate">Billing start date</label>
            </div>
            <div className='Input'>
              <input type="date" placeholder="Billing end date" name="billingEndDate" defaultValue={ConvertDate(formData?.billingEndDate)}
                onChange={(e) => setBillingEndDate(e.target.value)} />
              <label htmlFor="billingEndDate">Billing end date</label>
            </div>
            <div className='Input'>
              <input type="text" placeholder="WON" name="won" defaultValue={formData?.WON}
                onChange={(e) => setWON(e.target.value)} />
              <label htmlFor="won">WON</label>
            </div>
            <div className='Input'>
              <input type="text" placeholder="Funnel" name="funnel" defaultValue={formData?.setFunnel}
                onChange={(e) => setFunnel(e.target.value)} />
              <label htmlFor="funnel">Funnel</label>
            </div>
            <div className='Input'>
              <input type="text" placeholder="TEL location" name="tellocation" defaultValue={formData?.telLocation}
                onChange={(e) => setTelLocation(e.target.value)} />
              <label htmlFor="tellocation">TEL location</label>
            </div>
            <div className='Input'>
              <input type="email" placeholder="Email" name="email" defaultValue={formData?.email}
                onChange={(e) => setEmail(e.target.value)} />
              <label htmlFor="email">Email</label>
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
            <div className='Input'>
              <select type="text" placeholder="Status" name="status" defaultValue={formData ? formData?.status : 'default'}
                onChange={(e) => setStatus(e.target.value)} >
                <option value={'default'} disabled>Choose an option</option>
                {statusList && (statusList.map((item) => {
                  return <option key={item} value={item} selected={formData?.status == item ? true : false}>{item}</option>
                }))}
              </select>
              <label htmlFor="status">Status</label>
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