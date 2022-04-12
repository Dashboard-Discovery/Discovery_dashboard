import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Button from '@mui/material/Button';
import { timeSheetDelete} from '../Service/service';


const ConfirmDelete=({openDelete,setOpenDelete,id})=>{
    const handleClose = () => {
        setOpenDelete(false);
    
      }
      const handleDelete=async()=>{
        const res= await timeSheetDelete(id);
        console.log('status deleted',res.staus);
        if(res.message=='Successfully Deleted'){
          setOpenDelete(false);
        }
      }
  
      return (
      
        <Dialog open={openDelete} onClose={handleClose} >
        <DialogContent>
        <div>Item will be deleted permenantly</div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleDelete}>Confirm</Button>
        </DialogActions>
      </Dialog>

      )}
export default ConfirmDelete;