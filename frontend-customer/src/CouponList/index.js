import React from 'react';
import { Redirect } from 'react-router-dom';
import TitleBar from '../sharedComponents/TitleBar';

function CouponList() {
    if (localStorage.getItem('Authorization-Token') === null) {
        return <Redirect to="/login" />;
    }
    else if (localStorage.getItem('role').localeCompare("Restaurant Staff") === 0) {
        return <Redirect to="/validation" />;
    }
    return (
        <>
            <div data-testid='title'>
                <TitleBar title='My coupon'/>
            </div>
            <div>Customer Coupon List</div>
        </>
    )
}

export default CouponList;