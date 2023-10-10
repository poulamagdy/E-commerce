import React, { useContext } from 'react'
import style from './PaymentDetails.module.css';
import { useFormik } from 'formik';
import { Cartcontext } from '../../Context/CartContext';
import axios from 'axios';
import { useParams } from 'react-router-dom';


export default function PaymentDetails() {

    let { pay } = useContext(Cartcontext);
    let { id } = useParams();

    async function sentData(value) {
        console.log(id);
        let { data } = await pay(value, id);
        console.log(data.status);
        if (data.status == "success") {
            window.location.href = data.session.url;
        }
    }

    let formik = useFormik({
        initialValues: {
            details: '',
            phone: '',
            city: ''
        },
        onSubmit: sentData
    })

    return <>
        <div className='margin-top'>
            <form onSubmit={formik.handleSubmit}>
                <label htmlFor="Details">Details:</label>
                <input type="text" name='details' className='form-control' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.details} id='Details' />


                <label htmlFor="Phone">Phone:</label>
                <input type="tel" name='phone' className='form-control' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.phone} id='Phone' />


                <label htmlFor="City">City:</label>
                <input type="text" name='city' className='form-control' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.city} id='City' />

                <button type='submit' disabled={!formik.dirty} className='btn bg-main text-white my-3'>Pay Now</button>
            </form>
        </div>
    </>
}
