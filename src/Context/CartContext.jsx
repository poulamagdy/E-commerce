import axios from 'axios';
import { createContext, useState } from 'react';

export let Cartcontext = createContext();

export default function Cartcontextprovider({ children }) {
    let [counter, setcounter] = useState(0);
    const Baseurl = `https://ecommerce.routemisr.com`
    const headers = { token: localStorage.getItem('userToken') };
    
    function getcartproduct(id) {
        return axios.post('https://ecommerce.routemisr.com/api/v1/cart',
            {
                productId: id
            },
            {
                headers
            })
            .then(res => res)
            .catch(err => err)
    }

    function getcart() {
        return axios.get('https://ecommerce.routemisr.com/api/v1/cart',
            {
                headers
            })
            .then(res => res)
            .catch(err => err)
    }

    function removecart(id) {
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,
            {
                headers
            })
            .then(res => res)
            .catch(err => err)
    }

    function updatecart(id, count) {
        return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,
            {
                count
            },
            {
                headers
            })
            .then(res => res)
            .catch(err => err)
    }

    function pay(data, id) {

        return axios.post(`${Baseurl}/api/v1/orders/checkout-session/${id}?url=http://localhost:3000`,
            {
                shippingAddress: data
            }, {
            headers
        }).then(res => res)
            .catch(err => err)
    }
    
    function deletecart()
    {
        return axios.delete(`${Baseurl}/api/v1/cart`,
        {
            headers
        })
    }
    
    return <Cartcontext.Provider value={{ getcartproduct, getcart, removecart, updatecart, pay, deletecart, counter, setcounter}}>
        {children}
    </Cartcontext.Provider>
}