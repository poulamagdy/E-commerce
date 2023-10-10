import axios from 'axios';
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Oval } from 'react-loader-spinner';

export default function VerifyCode() {
  let [isloading, setloading] = useState(false);
  let [error, seterror] = useState(null);
  let nav = useNavigate();

  const onSubmit = async (value) => {
    setloading(true);
    let { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode', value)
      .catch(() => {
        setloading(false);
      });
    if (data.status === 'Success') {
      setloading(false);
      nav('/reset-password');
    }
  }
  let formik = useFormik({
    initialValues: {
      resetCode: ''
    },
    onSubmit
  })
  return <>
    {isloading ? <div className='loading'>
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
    </div> : <div className='margin-top'>
      <h2>reset your account password</h2>
      <form onSubmit={formik.handleSubmit}>
        <input type="text" placeholder='Code' className='form-control my-3' name='resetCode' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.resetCode} />
        <button className='btn btn-lg me-auto btn-outline-success' type='submit'>verify</button>
      </form>
    </div>}

  </>
}
