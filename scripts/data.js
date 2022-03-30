let XLSX =  require('xlsx');

    try {
  
const wb = XLSX.readFile("%PUBLIC_URL%/resources.xlsx", {cellDates:true});


/* Get first worksheet */
const wsname = wb.SheetNames[0];
const ws = wb.Sheets[wsname];
/* Convert array of arrays */
const data = XLSX.utils.sheet_to_row_object_array(ws);
/*fs.writeFile('./../resources.json', JSON.stringify(data), err => {
    if (err) {
        console.log('Error writing file', err)
    } else {
        console.log('Successfully wrote file')
    }
});*/
console.log(data);
    }
    catch (error) {
        console.error('error', error);
    }

