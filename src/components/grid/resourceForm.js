import React from "react";

import styles from './grid.module.scss';

const AddEditForm = ({ formData }) =>  {
  const handleSubmit = (e) => {
    console.log(e.target);
    debugger;
  }
  
  return (
  <div className= {styles.form_wrapper}>
    <form onSubmit= {handleSubmit}>
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
      <button type="submit">Update</button>
    </form>
  </div>)
  
}

class Input extends React.Component {
  render() {
    return <div className='Input'>
              <input type={ this.props.type } name={ this.props.name } defaultValue={this.props.value} placeholder={ this.props.placeholder }/>
              <label htmlFor={ this.props.name }>{ this.props.placeholder }</label>
           </div>
  }
}

export default AddEditForm;