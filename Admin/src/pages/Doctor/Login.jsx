import React, { useContext, useState } from 'react'
import { AdminContext } from '../../context/AdminContext';
import { toast } from 'react-toastify';
import { DoctorContext } from '../../context/DoctorContext';
import axios from 'axios';

export default function Login() {
    const [state,setState]= useState('Admin')
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');

    const {setAToken,backendUrl} = useContext(AdminContext);
    const {setDToken} = useContext(DoctorContext)
    const onSubmitHandler = async (event) => {
        event.preventDefault();
        try{
            if(state == 'Admin'){
                const {data} = await axios.post(backendUrl + '/api/admin/login' ,{email,password});
                if(data.success){
                    localStorage.setItem('aToken' ,data.token);
                    setAToken(data.token)
                }
                else{
                        toast.error(data.message)
                }
            }
            else{
                const {data} = await axios.post(backendUrl + '/api/doctor/login' , {email,password});
                if(data.success){
                    localStorage.setItem('dToken',data.dToken);
                    setDToken(data.dToken);
                    console.log(data.token)
                }
                else{
                    toast.error(data.message)
                }
            }
        }catch(error){
          console.log(error)
        }
    }
  return (
    <div>
      
    </div>
  )
}
