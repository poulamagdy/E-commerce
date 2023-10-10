import React from 'react'
import { useEffect, useState } from 'react';

export default function useNetwork() {

    let [isOnline, setIsonline] = useState(true);

    function getnetwork() {
        window.addEventListener('online', function () {
            setIsonline(true);
        });

        window.addEventListener('offline', function() {
            setIsonline(false);
        });
    }

    useEffect(() => {
        getnetwork();
    }, [])

    return <>
        {isOnline ? <div className='network'>
            <i className='fas fa-wifi'></i> Your are online
        </div> : <div className='network'>
            <i className='fas fa-wifi'></i> Your are offline
        </div>}
    </>
}
