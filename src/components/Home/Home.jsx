import React, { useContext } from 'react'
import style from './Home.module.css';
import Allproducts from '../Allproducts/Allproducts';
import CategorySlider from '../CategorySlider/CategorySlider';
import Mainslider from '../Mainslider/Mainslider';




export default function Home() {
    return <>
        <div className='margin-top'>
            <Mainslider />
            <CategorySlider />
            <Allproducts />
        </div>
    </>
}
