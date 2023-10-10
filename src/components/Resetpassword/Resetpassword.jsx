import React from 'react'
import style from './Resetpassword.module.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


export default function Resetpassword() {
    let nav = useNavigate()
    const onSubmit = async (value)=>
    {
        let res = await axios.put('https://ecommerce.routemisr.com/api/v1/auth/resetPassword', value)
        .then(()=>
        {
            nav('/');
        });
        
    }
    const validationSchema = Yup.object({
        newPassword: Yup.string().matches(/^[A-Z][a-z0-9]{5,20}/, 'password not match').required('required')
    })
    let formik = useFormik({
        initialValues:{
            email:'',
            newPassword:''
        },
        validationSchema,
        onSubmit
    })

    return (
        <div className='margin-top'>
            <form onSubmit={formik.handleSubmit}>
                <input type="email" placeholder='Email' className='form-control my-3' name='email' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} />
                <input type="password" placeholder='newPassword' className='form-control my-3' name='newPassword' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.newPassword} />
                {formik.errors.newPassword && formik.touched.newPassword ? <div className='alert alert-danger'>{formik.errors.newPassword}</div> : ''}
                <button className='btn btn-lg me-auto btn-outline-success' type='submit'>verify</button>
            </form>
        </div>
    )
}
