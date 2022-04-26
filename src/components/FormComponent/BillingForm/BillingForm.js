import { useState, useEffect } from "react"
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { getAllProjects, createBilling, updateBilling, getAllRoles } from '../../Service/service';
import styles from './billingform.module.scss';




const BillingForm = ({ row, formType, open, setOpen, setFormType, handleReload }) => {
  const handleClose = () => {
    setOpen(false);
    setFormType('')

  }
  const [project, setProject] = useState('');
  const [role, setRole] = useState('');
  const [amount, setAmount] = useState('0');
  const [projectList, setProjectList] = useState([])
  const [roleList, setRoleList] = useState([])

  useEffect(() => {
    if (formType === 'edit') {
      setProject(row?.projectName);
      setRole(row?.role);
      setAmount(row?.amount);
    } else if (formType === 'add') {
      setProject('');
      setRole('');
      setAmount('');
    }


  }, [row, open, formType])
  useEffect(() => {
    (async () => {
      const responseProject = await getAllProjects();
      setProjectList(responseProject);
      const responseRole = await getAllRoles();
      setRoleList(responseRole);
    })()

  }, [])

  const handleSaveOrUpdate = async () => {

    let data = {
      "projectName": project,
      "role": role,
      "amount": amount
    }
    if (formType === 'edit') {
      const response = await updateBilling(data, row?.id);
      if (response === '200' || 'OK') {
        setOpen(false);
        handleReload();
      }
    }
    if (formType !== 'edit') {
      const response = await createBilling(data);
      if (response === '200' || 'OK') {
        setOpen(false);
        handleReload();
      }
    }
  }
  return (

    <Dialog open={open} onClose={handleClose} >
      <DialogTitle id="customized-dialog-title" onClose={handleClose}>
        {formType === 'edit' ? 'Update details' : 'Add new details'}
      </DialogTitle>
      <DialogContent>
        <div className={styles.form_wrapper}>
          <form>
            <div className='Input'>
              <select type="text" placeholder="Project" name="project" defaultValue={row?.projectName}
                onChange={(e) => setProject(e.target.value)} >
                {projectList && (projectList.map((item) => {
                  return <option key={item?.id} value={item.projectName} selected={row?.projectName === item.projectName ? true : false}>{item.projectName}</option>
                }))}
              </select>
              <label htmlFor="project">Project</label>
            </div>
            <div className='Input'>
              <select type="text" placeholder="Role" name="role" defaultValue={row?.role}
                onChange={(e) => setRole(e.target.value)} >
                {roleList && (roleList.map((item) => {
                  return <option key={item?.id} value={item.role} selected={row?.role == item.role ? true : false}>{item.role}</option>
                }))}
              </select>
              <label htmlFor="project">Role</label>
            </div>
            <div className='Input'>
              <input type="number" placeholder="Rate/Hour" name="amount" value={amount}
                onChange={(e) => setAmount(e.target.value)} />
              <label htmlFor="empNo">Rate/Hour</label>
            </div>

          </form>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSaveOrUpdate}>Submit</Button>
      </DialogActions>
    </Dialog>
  )
}
export default BillingForm;