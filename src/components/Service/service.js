import { getTokenNow } from '../../utils/useToken';
import { SERVERURL } from '../../utils/constants';

export const getResourceByEmployeeNumber = (employeeNumber) => {


    const tokenNow = `Bearer ${getTokenNow()}`;
    console.log('token now is', tokenNow)

    fetch('http://10.75.80.111:8423/billing/v1/admin/resource', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': tokenNow
        },

    })
        .then((res) => {
            console.log('data', res.json())
        })
        .catch(error => {
            if (error.response?.status === 401) console.log(error.response.data.message);
            else console.log("Something went wrong. Please try again later.");
        })
}


export  const getAllTimesheet=async (filter)=>{
    let url='http://10.75.80.111:8423/billing/v1/admin/timesheet'
    if(filter){
        if(filter!=='ALL PROJECTS'){
            url +=`?projectname=${filter}`
        }
        
    }
     const tokenNow = await `Bearer ${getTokenNow()}`;
    console.log('token now is', tokenNow)
    const response =await fetch(url, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': tokenNow
        },

    });
    const data= await response.json();
    return  data;
       

}
export  const saveTimeSheetEntry=async (data)=>{
    const tokenNow = await `Bearer ${getTokenNow()}`;
   console.log('token now is', tokenNow)
   const response =await fetch("http://10.75.80.111:8423/billing/v1/admin/timesheet", {
       method: 'POST',
       headers: {
           'Accept': 'application/json',
           'Content-Type': 'application/json',
           'Authorization': tokenNow
       },
       body:JSON.stringify(data)
   });
   return  response.status;
}

export  const updateTimeSheetEntry=async (data,id)=>{
    const tokenNow = await `Bearer ${getTokenNow()}`;
    let url=`http://10.75.80.111:8423/billing/v1/admin/timesheet/${id}`;
    console.log('url getting here is',url);
   console.log('token now is', tokenNow)
   const response =await fetch(`http://10.75.80.111:8423/billing/v1/admin/timesheet/${id}`, {
       method: 'PUT',
       headers: {
           'Accept': 'application/json',
           'Content-Type': 'application/json',
           'Authorization': tokenNow
       },
       body:JSON.stringify(data)
   });
   console.log('update statussssssssssssssssssssssssssssssssssssssssssssssss',response);
   return  response.status;
}
export  const getAllProjects=async ()=>{
    const tokenNow = await `Bearer ${getTokenNow()}`;
   console.log('token now is', tokenNow)

   const response =await fetch("http://10.75.80.111:8423/billing/v1/admin/project", {
       method: 'GET',
       headers: {
           'Accept': 'application/json',
           'Content-Type': 'application/json',
           'Authorization': tokenNow
       },

   });
   const data= await response.json();
   return  data;
      
      

}

export const getAllResources = async () => {
    const tokenNow = await `Bearer ${getTokenNow()}`;

    const response = await fetch(`${SERVERURL}/billing/v1/admin/resource`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': tokenNow
        },

    });
    const data = await response.json();
    return data;


}

export const saveResource = async (data) => {
    const tokenNow = await `Bearer ${getTokenNow()}`;
    console.log('token now is', tokenNow)

    const response = await fetch(`${SERVERURL}/billing/v1/admin/resource`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': tokenNow
        },
        body: JSON.stringify(data)

    });
    return response.status;
}
