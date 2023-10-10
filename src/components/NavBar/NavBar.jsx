import React, { useContext, useEffect, useState } from 'react'
import style from './NavBar.module.css'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../../Assets/freshcart-logo (1).svg'
import { UserContext } from '../../Context/UserContext'
import { Cartcontext } from '../../Context/CartContext'

export default function NavBar() {
    let {counter} = useContext(Cartcontext);
    let navigate = useNavigate();
    let { userToken, setUsertoken } = useContext(UserContext);

    return <>
        <nav className="navbar fixed-top navbar-expand-lg bg-body-tertiary">
            <div className="container">
                <Link className="navbar-brand" to=""><img src={logo} alt="" /></Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    {userToken ? <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link" to="">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="product">Products</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="cate">Categories</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="brands">Brands</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="cart">Cart</Link>
                        </li>
                    </ul> : ''}

                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item d-flex justify-content-center align-items-center">
                            <i className="fa-brands mx-2 fa-facebook"></i>
                            <i className="fa-brands mx-2 fa-twitter"></i>
                            <i className="fa-brands mx-2 fa-instagram"></i>
                            <i className="fa-brands mx-2 fa-tiktok"></i>
                            <i className="fa-brands mx-2 fa-linkedin"></i>
                            <i className="fa-brands mx-2 fa-youtube"></i>
                            {userToken ?
                                    <div className='position-relative'>
                                        <Link to='cart'><i className='fa-solid fa-cart-shopping fa-2xl '></i>
                                            <div className="badge position-absolute top-0 end-0 text-white bg-main">{counter? counter : 0}</div>
                                        </Link>
                                    </div>
                                :
                                ''}
                        </li>
                        {userToken ?
                            <li className="nav-item">
                                <a className={`nav-link ${style.logtest}`} onClick={
                                    () => {
                                        localStorage.removeItem('userToken');
                                        setUsertoken(null);
                                        navigate('/login');
                                    }
                                }>Logout</a>
                            </li>
                            :
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="login">Login</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="register">Register</Link>
                                </li>
                            </>
                        }
                    </ul>
                </div>
            </div>
        </nav>

    </>
}
