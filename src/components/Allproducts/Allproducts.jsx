import React, { useContext, useEffect, useState } from 'react'
import style from './Allproducts.module.css';
import axios from 'axios';
import { Oval } from 'react-loader-spinner';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { Cartcontext } from '../../Context/CartContext';
import toast, { Toaster } from 'react-hot-toast';

export default function Allproducts() {

    let {getcartproduct,setcounter} = useContext(Cartcontext)

    // let [product, setproduct] = useState([]);
    // let [isLoading, setLoading] = useState(false);

    // async function sentProducts() {
    //     setLoading(true);
    //     let { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/products');
    //     setproduct(data.data);
    //     setLoading(false);
    // }

    // useEffect(() => {
    //     sentProducts()
    // }, [])
    function sentProducts() {
        return axios.get('https://ecommerce.routemisr.com/api/v1/products');
    }

    let { isLoading, isFetched, data } = useQuery('allproducts', sentProducts, {
        // cacheTime:1000
        // refetchOnMount:true
        // staleTime:1000
        // refetchInterval:1000
    });

    async function getidproduct(id)
    {
        let {data} = await getcartproduct(id);
        if (data.status === 'success')
        {
            setcounter(data.numOfCartItems)
            toast('your product add to cart')
        }
    }

    return <>
        {isLoading ? <div className='loading'>
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
            </div> : <div className="row">
            <Toaster/>
            {data?.data.data.map((prod) => (
                <div key={prod.id} className="col-md-2">
                    <div className="product p-2">
                        <Link to={`/product/${prod.id}`}>
                            <img src={prod.imageCover} className='w-100' alt="" />
                            <span className='text-main'>{prod.category.name}</span>
                            <h3>{prod.title.split(" ").splice(0, 2).join(" ")}</h3>
                            <div className='d-flex justify-content-between align-items-center'>
                                <span>{prod.price} EG</span>
                                <i className='fas fa-star rating-color'><span className='text-black'> {prod.ratingsAverage}</span></i>
                            </div>
                        </Link>
                        <i onClick={()=> getidproduct(prod.id)} className="fa-solid fa-heart h3 d-flex flex-row-reverse cursor-pointer"></i>
                        <button onClick={()=> getidproduct(prod.id)} className='btn w-100 bg-main btn-sm text-white'>Add to cart</button>
                    </div>
                </div>
            ))}
        </div>}

    </>
}
