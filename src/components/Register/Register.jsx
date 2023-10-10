import React, { useState } from 'react'
import style from './Register.module.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { Oval } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';

export default function Register() {

    let navigate = useNavigate();
    let [isloading, setloading] = useState(false);
    let [error, setError] = useState(null);

    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

    const validationSchema = Yup.object({
        name: Yup.string('enter string').min(3, 'length more than 3').max(15, 'length less than 15').required('required'),
        email: Yup.string().email('email not match').required('required'),
        phone: Yup.string().matches(phoneRegExp, 'phone not vaild').required('required'),
        password: Yup.string().matches(/^[A-Z][a-z0-9]{5,20}/, 'password not match').required('required'),
        rePassword: Yup.string().oneOf([Yup.ref('password')], 'not match').required('required')
    });

    async function sendData(value) {

        setloading(true);

        let { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup', value)
            .catch((err) => {
                setloading(false)
                setError(err.response.data.message)
            })

        if (data.message === "success") {
            setloading(false)
            navigate('/Login')
        }
        setloading(false)
    }
    let formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            rePassword: '',
            phone: ''
        },
        validationSchema,
        onSubmit: sendData
    })
    return <>
        <div className='margin-top'>
            <div className='w-75 mx-auto my-5'>

                {error !== null ? <div className="alert alert-danger">{error}</div> : ''}

                <h3>Register Now:</h3>
                <form onSubmit={formik.handleSubmit}>
                    <label htmlFor="uName">Name:</label>
                    <input type="text" name="name" id="uName" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.name} className='form-control' />
                    {formik.errors.name && formik.touched.name ? <div className='alert alert-danger'>{formik.errors.name}</div> : ''}

                    <label htmlFor="uEmail">Email:</label>
                    <input type="email" name="email" id="uEmail" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} className='form-control' />
                    {formik.errors.email && formik.touched.email ? <div className='alert alert-danger'>{formik.errors.email}</div> : ''}

                    <label htmlFor="uPassword">Password:</label>
                    <input type="password" name="password" id="upassword" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password} className='form-control' />
                    {formik.errors.password && formik.touched.password ? <div className='alert alert-danger'>{formik.errors.password}</div> : ''}

                    <label htmlFor="uRePassword">rePassword:</label>
                    <input type="password" name="rePassword" id="uRepassword" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.rePassword} className='form-control' />
                    {formik.errors.rePassword && formik.touched.rePassword ? <div className='alert alert-danger'>{formik.errors.rePassword}</div> : ''}

                    <label htmlFor="uPhone">Phone:</label>
                    <input type="tel" name="phone" id="uPhone" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.phone} className='form-control' />
                    {formik.errors.phone && formik.touched.phone ? <div className='alert alert-danger'>{formik.errors.phone}</div> : ''}
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
                        : <div className='d-flex flex-row-reverse justify-content-between'>
                            <button disabled={!(formik.isValid && formik.dirty)} className='btn bg-main text-white my-4' type='submit'>Register</button>
                        </div>}
                </form>
            </div>
        </div>
    </>
}
