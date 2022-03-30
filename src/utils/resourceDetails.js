const resources = require('../data/resourceDetails.json');

export const getBillableDetails = () => {
    let bill = 0;
    let nonBill = 0;
    resources.map((obj) => {
        if (obj['billability'] === 'billable') {
            bill++;
        } else {
            nonBill++;
        }
    });
    return {
        bill: bill,
        nonBill: nonBill,
        total: resources.length
    };
}

export const processData = () => {
    const dataStringLines = resources;
    const headers = Object.keys(dataStringLines[0]);
    
    const list = [];
    for (let i = 0; i < dataStringLines.length; i++) {
      const row = dataStringLines[i];
      if (headers) {
        const obj = {};
        for (let j = 0; j < headers.length; j++) {
          let d = row[j];
          if (d.length > 0) {
            if (d[0] == '"')
              d = d.substring(1, d.length - 1);
            if (d[d.length - 1] == '"')
              d = d.substring(d.length - 2, 1);
          }
          if (headers[j]) {
            obj[headers[j]] = d;
          }
        }
        
    
        // remove the blank rows
        if (Object.values(obj).filter(x => x).length > 0) {
          list.push(obj);
        }
      }
    }

    // prepare columns list from headers
    const columns = headers.map(c => ({
      name: c,
      selector: c,
    }));

    return {
        columns : columns,
        data: list
    }
  }