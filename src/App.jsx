import React from 'react'
import { RouterProvider, createBrowserRouter, createHashRouter } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import Home from './components/Home/Home'
import Products from './components/Products/Products'
import Cate from './components/Cate/Cate'
import Cart from './components/Cart/Cart'
import Brands from './components/Brands/Brands'
import Register from './components/Register/Register'
import Login from './components/Login/Login'
import Notfound from './components/Notfound/Notfound'
import UserContextprovider from './Context/UserContext'
import ProductDetails from './components/ProductDetails/ProductDetails'
import Gurad from './components/Gurad/Gurad'
import Forget from './components/ForgetPassword/ForgetPassword'
import Reset from './components/Resetpassword/Resetpassword'
import Cartcontextprovider from './Context/CartContext'
import { Provider } from 'react-redux'
import { Store } from './Redux/Store'
import PaymentDetails from './components/PaymentDetails/PaymentDetails'
import Verify from './components/VerifyCode/VerifyCode'
import Order from './components/Order/Order'


export default function App() {
  const routers = createHashRouter([
    {
      path: '', element: <Layout />, children: [
        { index: true, element: <Gurad> <Home /> </Gurad> },
        { path: 'product', element: <Gurad> <Products /> </Gurad> },
        { path: '/product/:id', element: <Gurad> <ProductDetails /> </Gurad> },
        { path: 'cate', element: <Gurad> <Cate /> </Gurad> },
        { path: 'brands', element: <Gurad> <Brands /> </Gurad> },
        { path: 'paymentDetails/:id', element: <Gurad> <PaymentDetails/> </Gurad> },
        { path: 'allorders', element: <Gurad> <Order/> </Gurad> },
        { path: '/forget-password', element: <Forget/> },
        { path: '/verify-code', element: <Verify/> },
        { path: '/reset-password', element: <Reset/> },
        { path: 'register', element: <Register /> },
        { path: 'login', element: <Login /> },
        { path: 'cart', element: <Gurad> <Cart /> </Gurad> },
        { path: '*', element: <Gurad> <Notfound /> </Gurad> },
      ]
    }
  ])

  return <>
    <UserContextprovider>
      <Cartcontextprovider>
        <Provider store={Store}>
          <RouterProvider router={routers}></RouterProvider>
        </Provider>
      </Cartcontextprovider>
    </UserContextprovider>
  </>


}
