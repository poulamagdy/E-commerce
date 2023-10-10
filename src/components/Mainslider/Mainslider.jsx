import React from 'react'
import style from './Mainslider.module.css';
import Slider from "react-slick";

import sliderOne from '../../Assets/slider-image-1.jpeg';
import sliderTwo from '../../Assets/slider-image-2.jpeg';
import sliderThree from '../../Assets/slider-image-3.jpeg';


import blogOne from '../../Assets/blog-img-1.jpeg';
import blogTwo from '../../Assets/blog-img-2.jpeg';



export default function Mainslider() {

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    return <>

        <div className="row align-items-center my-3 gx-0">
            <div className="col-md-8">
                <Slider {...settings}>
                    <img src={sliderOne} className='w-100' alt="" />
                    <img src={sliderTwo} className='w-100' alt="" />
                    <img src={sliderThree} className='w-100' alt="" />
                </Slider>
            </div>
            <div className="col-md-4">
                <div className="col-md-12">
                    <img src={blogOne} className='w-100' alt="" />
                </div>
                <div className="col-md-12">
                    <img src={blogTwo} className='w-100' alt="" />
                </div>
            </div>
        </div>

    </>
}
