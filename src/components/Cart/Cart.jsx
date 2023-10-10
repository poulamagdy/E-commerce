import React, { useContext, useEffect, useState } from 'react'
import style from './Cart.module.css';
import { Cartcontext } from '../../Context/CartContext';
import { useNavigate } from 'react-router-dom';


export default function Cart() {
    let nav = useNavigate()

    let { getcart , removecart , updatecart, deletecart,setcounter} = useContext(Cartcontext);
    let [cartData, setCart] = useState(null)

    async function getCart() {
        let { data } = await getcart();
        setcounter(data?.numOfCartItems);
        setCart(data);
    }

    async function removeitem(id)
    {
        let {data} = await removecart(id);
        setCart(data)
    }

    async function updateitem(id, count)
    {
        let {data} = await updatecart(id, count)
        setCart(data)
    }

    async function deleteproduct()
    {
        let {data} = await deletecart();
        setCart(null);
        setcounter(0);
    }

    useEffect(() => {
        getCart();
    }, [])

    return <>
        {cartData? <div className='bg-body-tertiary my-5 p-4'>
            <h3>shop cart:</h3>
            <h5 className='text-main'>Total cart price : {cartData.data.totalCartPrice}</h5>
            {cartData.data.products.map((item)=>(
                <div key={item.product.id} className="row my-2 align-items-center">
                    <div className="col-md-2">
                        <img src={item.product.imageCover} className='w-100' alt="" />
                    </div>
                    <div className="col-md-10 d-flex justify-content-between">
                        <div>
                            <h4>{item.product.title}</h4>
                            <h5 className='text-main'>price: {item.price}</h5>
                            <button onClick={()=> removeitem(item.product.id)} className='btn'><i className='fa fa-trash text-main'></i> Remove</button>
                        </div>
                        <div>
                            <button onClick={()=> updateitem(item.product.id, item.count+1)} className='btn btn-brde'><i className='fas fa-plus'></i></button>
                            <span className='mx-2'>{item.count}</span>
                            <button onClick={()=> updateitem(item.product.id, item.count-1)} className='btn btn-brde'><i className='fas fa-minus'></i></button>
                        </div>
                    </div>
                </div>
            ))}
            <button onClick={()=> nav(`/paymentDetails/${cartData?.data._id}`)} className='btn bg-main text-white my-3'>Pay now</button>
            <button onClick={()=> deleteproduct()} className='btn bg-main text-white my-3 ms-3'>Clear Your Cart</button>
        </div> : <div className='bg-body-tertiary my-5 p-4'>
            <h2 className='my-5'>Cart Shop</h2>
            <p>your cart is empty</p>
            </div>}
    </>
}
