import axios from 'axios';
import { getTokenNow } from '../../utils/useToken';

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



