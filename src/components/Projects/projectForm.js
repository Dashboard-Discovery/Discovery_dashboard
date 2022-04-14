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
import styles from '../ResourceGrid/grid.module.scss';

const AddEditForm = ({ formData, isUpdate, open, setOpen, handleReload }) => {

  const [projectName, setProjectName] = useState('');
  const handleClose = () => {
    setOpen(false);
  }

  const handleSubmit = () => {

    const data = {
      "projectName": projectName
    };

    // if (!isUpdate) {
    //   const response = saveResource(data);
    //   if (response === '200' || 'OK') {
    //     setOpen(false);
    //     handleReload()
    //   }
    // } else {
    //   const response = updateResource(data, formData?.id);
    //   if (response === '200' || 'OK') {
    //     setOpen(false);
    //     handleReload();
    //   }
    // }
  }


  useEffect(() => {
    setProjectName(formData ? formData?.projectName : '');
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
              <input type="text" placeholder="Project" name="Project" defaultValue={formData?.projectName}
                onChange={(e) => setProjectName(e.target.value)} />
              <label htmlFor="Project">Project</label>
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