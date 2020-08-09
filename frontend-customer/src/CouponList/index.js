import React, { useEffect, useState }  from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import TitleBar from '../sharedComponents/TitleBar';
import Coupon from './Coupon'

function CouponList() {
    const [coupons, setCoupons] = useState([]);
    useEffect(() => {
        getCoupons().then(result => {
            setCoupons(result);
        });
      }, []);

    const getCoupons = async () => {
        const user = await axios.get('/users/me', {
            headers: {
            Authorization: 'Bearer ' + localStorage.getItem('Authorization-Token'),
          },
        });
        return await axios.get('/coupons?user.id=' + await user.data.id
        ).then(response => {
            console.log(response.data);
            return response.data;
        }).then(coupons => {
            return coupons.map(coupon => <Coupon coupon={coupon}/>);
        }).catch(() => []);
    };

    if (localStorage.getItem('Authorization-Token') === null) {
        return <Redirect to="/login" />;
    }
    else if (localStorage.getItem('role').localeCompare("Restaurant Staff") === 0) {
        return <Redirect to="/coupon-validation" />;
    }

    return (
        <>
            <div data-testid='title'>
                <TitleBar title='My coupon'/>
            </div>
            {coupons}
        </>
    );
}

export default CouponList;