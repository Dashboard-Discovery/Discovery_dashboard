import React from 'react';
import { getBillableDetails } from '../../utils/resourceDetails';

import styles from './summary.module.scss';

export default function Summary() {  
  const billDetails = getBillableDetails();
  // // handle file upload
  // const handleFileUpload = e => {
  //   const file = e.target.files[0];
  //   console.log(file);
  //   const reader = new FileReader();
  //   reader.onload = (evt) => {
  //     /* Parse data */
  //     const bstr = evt.target.result;
  //     const wb = XLSX.read(bstr, { type: 'binary' });
  //     /* Get first worksheet */
  //     const wsname = wb.SheetNames[0];
  //     const ws = wb.Sheets[wsname];
  //     /* Convert array of arrays */
  //     const data = XLSX.utils.sheet_to_row_object_array(ws);
  //     console.log(JSON.stringify(data));
  //     const sum = data.reduce((accumulator, object) => {
  //       return accumulator + object['Monthly Bill Amount( 9 * 22* HOURLY RATE)'];
  //     }, 0);  
  //     setTotal(sum);
  //     const bill = data.filter((obj) => obj['Billability'] === 'Billable').length;
  //     const nonBill = data.filter((obj) => obj['Billability'] === 'Non Billable').length;
  //     setBillable(bill);
  //     setNonBillable(nonBill)
  //     //processData(data);
  //   };
  //   reader.onerror = (evt) => {
  //       console.error("error occurred while processing document", evt.target.error.message);
  //   }
  //   reader.readAsBinaryString(file);
  // }

  return (
    <div className={styles.summary}>      
      <div className='row'>
        <div className='col-sm-4'>
          Total Resorces : {billDetails.total}
        </div>
        <div className='col-sm-4'>
          Billable  : {billDetails.bill}
        </div>
        <div className='col-sm-4'>
          Non Billable :  {billDetails.nonBill}
        </div>
      </div>
    </div>
  );
}
