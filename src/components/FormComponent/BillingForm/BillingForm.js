import { useState,useEffect } from "react"
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { getAllProjects, createBilling, updateBilling,getAllRoles } from '../../Service/service';
import styles from './billingformstyle.scss';




const BillingForm=({row,formType,open,setOpen,setFormType,handleReload})=>{
  const handleClose = () => {
    setOpen(false);
    setFormType('')

  }
  const [project,setProject]=useState('');
  const [role,setRole]=useState('');
  const [amount,setAmount]=useState('0');
  const [projectList,setProjectList]=useState([])
  const [roleList,setRoleList]=useState([])

  useEffect(()=>{
    if(formType==='edit'){
      setProject(row?.projectName);
      setRole(row?.role);
      setAmount(row?.amount);
    }else if(formType==='add'){
      setProject('');
      setRole('');
      setAmount('');
    }


  },[row,open])
  useEffect(async()=>{
    const responseProject= await getAllProjects();                                                                                                                                                                                  
    setProjectList(responseProject);
    const responseRole= await getAllRoles();                                                                                                                                                                                  
    setRoleList(responseRole);
    console.log('project list is',projectList)                                                                                                                                                                        
  },[])

  console.log('project list is',projectList)
  projectList.map((item)=>{console.log('item here is',item.id)})

  const handleProject=(e)=>{
    setProject(e.target.value)
  }
  const handleRole=(e)=>{
    setRole(e.target.value)
  }


  const handleAmount=(e)=>{
    setAmount(e.target.value);
  }
  const handleSaveOrUpdate=async()=>{

    let data={
      "projectName":project,
      "role":role,
      "amount":amount
      }
      if(formType =='edit'){
        console.log('data line 70',data)
        const response=await updateBilling(data,row?.id);
        if(response ==='200' || 'OK'){
          setOpen(false);
          handleReload();
        }
      }
      if(formType!=='edit'){
        const response=await createBilling(data);
        if(response==='200' || 'OK'){
          setOpen(false);
          handleReload();
        }
      }
  }
  return(

    <Dialog open={open} onClose={handleClose} >
      <DialogTitle id="customized-dialog-title" onClose={handleClose}>
        {formType==='edit' ? 'Update details' : 'Add new details'}
      </DialogTitle>
      <DialogContent>
        <div className={styles.form_wrapper}>
          <form>
          <div className='Input'>             
              <select type="text" placeholder="Project" name="project" defaultValue={row?.projectName}
                onChange={(e) => setProject(e.target.value)} >
                {projectList && (projectList.map((item) => {
                  return <option key={item?.id} value={item.projectName} selected={row?.projectName == item.projectName ? true : false}>{item.projectName}</option>
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
              <input type="text" placeholder="Rate/Hour" name="amount" defaultValue={row?.amount}
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
    {/* <DialogContent>
    <FormControl>
          <Select
          label="project"
        value={project}
        onChange={(e)=>{handleProject(e)}}
        style={{marginRight:'20%',width:'100%',color:'black',marginBottom:'10%'}}
      >
        {projectList &&(projectList.map((item)=>{
         return <MenuItem key={item?.id}value={item.projectName}>{item.projectName}</MenuItem>
        }))}

      </Select>
      <Select
          label="Role"
        value={role}
        onChange={(e)=>{handleRole(e)}}
        style={{marginRight:'20%',width:'100%',color:'black',marginBottom:'10%'}}
      >
        {roleList &&(roleList.map((item)=>{
         return <MenuItem key={item?.id}value={item?.role}>{item?.role}</MenuItem>
        }))}

      </Select>
        <TextField
      id="outlined-name"
      label="Amount"
      value={amount}
      onChange={(e)=>{handleAmount(e)}}
      style={{marginBottom:'10%'}}

    />
  </FormControl>
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose}>Cancel</Button>
      <Button onClick={handleSaveOrUpdate}>{formType==='edit'?'Update':'Save'}</Button>
    </DialogActions> */}
  </Dialog>
  )
}
export default BillingForm;