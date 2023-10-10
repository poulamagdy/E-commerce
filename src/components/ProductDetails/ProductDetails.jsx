import React, { useContext } from 'react'
import style from './ProductDetails.module.css';
import axios from 'axios';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import Slider from "react-slick";
import { Cartcontext } from '../../Context/CartContext';

export default function ProductDetails() {
    let {getcartproduct} = useContext(Cartcontext)

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    let { id } = useParams()

    function getDetails(x) {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${x}`)
    }

    let { data } = useQuery('productDetails', () => getDetails(id));

    async function getidprodduct(id)
    {
        let ref = await getcartproduct(id);
    } 

    return <>

        {data?.data.data ? <div>
            <div className="row py-2 align-items-center">
                <div className="col-md-4">
                    {/* <img src={data?.data.data.imageCover} className='w-100' alt="" /> */}
                    <Slider {...settings}>
                        {data?.data.data.images.map((img)=>(
                            <img src={img} className='w-100'/>
                        ))}
                    </Slider>
                </div>
                <div className="col-md-8">
                    <h2 className='h5'>{data?.data.data.title}</h2>
                    <p>{data?.data.data.description}</p>
                    <h6 className='text-main'>{data?.data.data.category.name}</h6>
                    <h6 className='text-main'>price : {data?.data.data.price} EGP</h6>
                    <div className='d-flex justify-content-between'>
                        <span>ratingQuantity:{data?.data.data.ratingsQuantity}</span>
                        <span><i className='fas fa-star rating-color'></i>{data?.data.data.ratingsAverage}</span>
                    </div>
                    <button onClick={()=> getidprodduct(data?.data.data._id)} className='btn w-100 bg-main text-white my-2'>Add to cart</button>
                </div>
            </div>
        </div> : ''}

    </>
}
