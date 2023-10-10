import React, { useState } from 'react'
import style from './ForgetPassword.module.css';
import { useFormik } from 'formik';
import axios from 'axios';
import { Oval } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';

export default function ForgetPassword() {

    let navigate = useNavigate();
    let [isloading, setloading] = useState(false);

    const onSubmit = async (value) => {
        setloading(true);
        let {data} = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords', value)
        .catch(()=>{
            setloading(false);
        })
        if (data.statusMsg === 'success')
        {
            setloading(false);
            navigate('/verify-code');
        }
        
}
let formik = useFormik({
    initialValues: {
        email: ''
    },
    onSubmit
});
return <>
    <div className='margin-top'>
        {isloading ?
            <div className='loading'>
                <Oval
                    height={80}
                    width={80}
                    color="#fff"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                    ariaLabel='oval-loading'
                    secondaryColor="#fff"
                    strokeWidth={2}
                    strokeWidthSecondary={2}
                />
            </div>
            : <div className='my-5'>
                <h2>please enter your verification code</h2>
                <form onSubmit={formik.handleSubmit}>
                    <input type="email" placeholder='Email' name='email' className='form-control my-3' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} />
                    <button className='btn btn-lg me-auto btn-outline-success' type='submit'>verify</button>
                </form>
            </div>}
    </div>
</>
}
