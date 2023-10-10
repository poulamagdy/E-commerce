import React, { useContext, useEffect } from 'react'
import style from './Layout.module.css';
import NavBar from '../NavBar/NavBar';
import { Outlet } from 'react-router-dom';
import Footer from '../Footer/Footer';
import { UserContext } from '../../Context/UserContext';
export default function Layout() {
    let { setUsertoken } = useContext(UserContext)

    useEffect(() => {
        if (localStorage.getItem('userToken') != null) {
            setUsertoken(localStorage.getItem('userToken'));
        }
    }, [])
    return <>
        <NavBar />
        <div className="container">
            <Outlet />

        </div>
        {/* <Footer /> */}
    </>
}
