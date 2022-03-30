import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
import TextField from '@mui/material/TextField';

const AddEditForm = ({ formData }) => {
  return (<>
    <FormControl>
      <TextField
        id="outlined-name"
        label="Employee Number"
        value={formData.empNo}
        disabled={true}
        style={{ paddingBottom: '2%' }}
      />
      <TextField
        id="date"
        label="Month & year"
        type="month"
        defaultValue={formData.month}
        sx={{ width: 220 }}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        id="outlined-name"
        label="Working Days"
        value={formData.workingDays}

      />

    </FormControl>
  </>)

}
export default AddEditForm;