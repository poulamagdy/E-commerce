import React, { useEffect, useState } from 'react'
import style from './Allbrands.module.css';
import axios from 'axios';


export default function Allbrands() {
    let [data,setdata] = useState(null);
    async function brands()
    {
        let {data} = await axios.get('https://ecommerce.routemisr.com/api/v1/brands');
        setdata(data)
    }

    useEffect(()=>{
        brands()
    },[])
    return (
        <>
        <div className='margin-top'>
            <div className="row gy-5">
                {data?.data.map((item)=>(
                    <div key={item._id} className="col-md-3">
                    <div className='product text-center'>
                        <img src={item.image} className='w-100' alt="" />
                        <p>{item.name}</p>
                    </div>
                </div>
                ))}
            </div>
        </div>
        </>
    )
}
