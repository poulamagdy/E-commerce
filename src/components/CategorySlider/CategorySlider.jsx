import React from 'react'
import style from './CategorySlider.module.css';
import axios from 'axios';
import { useQuery } from 'react-query';
import Slider from "react-slick";

export default function CategorySlider() {

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 1
    };

    function getCategory() {
        return axios.get('https://ecommerce.routemisr.com/api/v1/categories');
    }

    let { data } = useQuery('getcategroy', getCategory);

    return <>
        <div className='my-3'>
            <Slider {...settings}>
                {data?.data.data.map((img) => (
                    <img key={img._id} height={300} src={img.image} className='w-100' alt="" />
                ))}
            </Slider>
        </div>
    </>
}
