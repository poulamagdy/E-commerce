import React, { useContext, useState } from 'react'
import style from './Login.module.css';
import '../.././index.css'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { Oval } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'
import { UserContext } from '../../Context/UserContext';

export default function LoginSubmit() {

    let { setUsertoken } = useContext(UserContext);

    let navigate = useNavigate();
    let [isloading, setloading] = useState(false);
    let [error, setError] = useState(null);

    const validationSchema = Yup.object({
        email: Yup.string().email('email not match').required('required'),
        password: Yup.string().matches(/^[A-Z][a-z0-9]{5,20}/, 'password not match').required('required'),
    });

    async function sendData(value) {

        setloading(true);

        let { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', value)
            .catch((err) => {
                setloading(false)
                setError(err.response.data.message)
            })

        if (data.message === "success") {
            setloading(false);
            localStorage.setItem('userToken', data.token);
            setUsertoken(data.token);
            navigate('/');
        }
        setloading(false)
    }
    let formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema,
        onSubmit: sendData
    })
    return <>
        <div className='margin-top'>
            <div className='w-75 mx-auto my-5'>

                {error !== null ? <div className="alert alert-danger">{error}</div> : ''}

                <h3>Login Now:</h3>
                <form onSubmit={formik.handleSubmit}>

                    <label htmlFor="uEmail">Email:</label>
                    <input type="email" name="email" id="uEmail" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} className='form-control' />
                    {formik.errors.email && formik.touched.email ? <div className='alert alert-danger'>{formik.errors.email}</div> : ''}

                    <label htmlFor="uPassword">Password:</label>
                    <input type="password" name="password" id="upassword" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password} className='form-control' />
                    {formik.errors.password && formik.touched.password ? <div className='alert alert-danger'>{formik.errors.password}</div> : ''}

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
                                secondaryColor="black"
                                strokeWidth={2}
                                strokeWidthSecondary={2}
                            />
                        </div>
                        : <>
                            <div className='d-flex justify-content-between align-item-center'>
                                <Link className='my-4' to='/forget-password'>forget your password ?</Link>
                                <button disabled={!(formik.isValid && formik.dirty)} className='btn bg-main text-white my-4' type='submit'>Login</button>
                            </div>
                        </>
                    }
                </form>
            </div>
        </div>
    </>
}
