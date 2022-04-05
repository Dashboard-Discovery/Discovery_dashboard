import axios from 'axios';
export const getResourceByEmployeeNumber=(employeeNumber)=>{
    const basePath='http://10.75.80.111:8423/';
    let headers=new Headers();
    const token='Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJuaWtoaWxAdGF0YWVseHNpLmNvLmluIiwiRmlyc3ROYW1lIjoiTmlraGlsIiwicm9sZXMiOiJST0xFX0FETUlOIiwidG9rZW5fYWNjZXNzIjoiYWNjZXNzIiwiTGFzdE5hbWUiOiJSYWoiLCJleHAiOjE2NTEzODQwMzAsInVzZXJpZCI6MSwiaWF0IjoxNjQ4NzkyMDMwLCJqdGkiOiI4MzI1Y2ZmZS04OTZlLTQwYzAtYjVhZi1mNzQ4NTQ3M2E0MWIiLCJ1c2VybmFtZSI6Im5pa2hpbEB0YXRhZWx4c2kuY28uaW4ifQ.ToF6EyrMz5lDutukyiSUdHRCRlRSLYl8wA_P7B5gCU4'  
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', token);
    headers.append('Accept-Language','en')

   
    axios.get(`${basePath}/billing/v1/admin/resource?empNo=${employeeNumber}`,headers
       )
    .then(res => {
        res.headers.append('Access-Control-Allow-Origin','*')
        console.log('response is',res)
    }).catch(error=>{
        console.log('eert',error)
    })

}