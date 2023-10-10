import React, { useEffect } from 'react'
import style from './Cate.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { getallcategory } from '../../Redux/CategoryReducer';
import { Oval } from 'react-loader-spinner';

export default function Cate() {
    let { isLoading, isError, category } = useSelector((state) => state.categorys);
    let dispatch = useDispatch()

    useEffect(() => {
        dispatch(getallcategory());
    }, [])
    return <>

        {isLoading ? <div className='loading'>
            <Oval
                height={80}
                width={80}
                color="#fff"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
                ariaLabel='oval-loading'
                secondaryColor="#fff"
                strokeWidth={2}
                strokeWidthSecondary={2}
            />
        </div> :
            <div className='margin-top'>
                <div className="row">
                    {category.map((item) =>
                    (
                        <div key={item._id} className="col-md-2">
                            <img height={300} src={item.image} className='w-100' alt="" />
                            <h4>{item.name}</h4>
                        </div>
                    ))}
                </div>
            </div>
        }
    </>
}
