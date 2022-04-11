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

export  const getAllCountries=async ()=>{
    const tokenNow = await `Bearer ${getTokenNow()}`;
   console.log('token now is', tokenNow)

   const response =await fetch("http://10.75.80.111:8423/billing/v1/admin/country", {
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




export const getAllResources = async (pageSize, pageNumber) => {
    const tokenNow = await `Bearer ${getTokenNow()}`;
    const pageNo = pageNumber >= 0? '?pageNo='+pageNumber+'&pageSize=' +pageSize : ''
    const response = await fetch(`${SERVERURL}/billing/v1/admin/resource${pageNo}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': tokenNow
        }

    })
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

export const updateResource = async (data, id) => {
    const tokenNow = await `Bearer ${getTokenNow()}`;
    console.log('token now is', tokenNow)

    const response = await fetch(`${SERVERURL}/billing/v1/admin/resource/${id}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': tokenNow
        },
        body: JSON.stringify(data)

    });
    return response.status;
}

export const getBilling=async()=>{
    let url='http://10.75.80.111:8423/billing/v1/admin/billing'
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
export  const updateBilling=async (data,id)=>{
    const tokenNow = await `Bearer ${getTokenNow()}`;
    let url=`http://10.75.80.111:8423/billing/v1/admin/billing/12${id}`;
    console.log('url getting here is',url);
   console.log('token now is', tokenNow)
   const response =await fetch(url, {
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

export  const createBilling=async (data)=>{
    const tokenNow = await `Bearer ${getTokenNow()}`;
   console.log('token now is', tokenNow)
   const response =await fetch("http://10.75.80.111:8423/billing/v1/admin/billing", {
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

export  const getAllRoles=async ()=>{
    const tokenNow = await `Bearer ${getTokenNow()}`;
   console.log('token now is', tokenNow)

   const response =await fetch("http://10.75.80.111:8423/billing/v1/admin/role", {
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


export const getAllProjectMaster = async () => {
    const tokenNow = await `Bearer ${getTokenNow()}`;

    const response = await fetch(`${SERVERURL}/billing/v1/admin/project?projectName=Discovery`, {
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


export const updateProjectMaster = async (data, id) => {
    const tokenNow = await `Bearer ${getTokenNow()}`;
    console.log('token now is', tokenNow)

    const response = await fetch(`${SERVERURL}/billing/v1/admin/project/Discovery/${id}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': tokenNow
        },
        body: JSON.stringify(data)

    });
    return response.status;
}

export const saveProjectMaster = async (data) => {
    const tokenNow = await `Bearer ${getTokenNow()}`;
    console.log('token now is', tokenNow)

    const response = await fetch(`${SERVERURL}/billing/v1/admin/project`, {
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

export const getAllRoleMaster = async () => {
    const tokenNow = await `Bearer ${getTokenNow()}`;

    const response = await fetch(`${SERVERURL}/billing/v1/admin/role`, {
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

export const updateRoleMaster = async (data, id) => {
    const tokenNow = await `Bearer ${getTokenNow()}`;
    console.log('token now is', tokenNow)

    const response = await fetch(`${SERVERURL}/billing/v1/admin/role/Senior Consultant/${id}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': tokenNow
        },
        body: JSON.stringify(data)

    });
    return response.status;
}


export const saveRoleMaster = async (data) => {
    const tokenNow = await `Bearer ${getTokenNow()}`;
    console.log('token now is', tokenNow)

    const response = await fetch(`${SERVERURL}/billing/v1/admin/role`, {
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


