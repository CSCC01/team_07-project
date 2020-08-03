import React from 'react';
import { Redirect } from 'react-router-dom';
import TitleBar from '../sharedComponents/TitleBar';

function CouponValidation() {
    if (localStorage.getItem('Authorization-Token') === null) {
        return <Redirect to="/login" />;
    }
    else if (localStorage.getItem('role').localeCompare("Customer") === 0) {
        return <Redirect to="/" />;
    }
    return (
        <>
            <div data-testid='title'>
                <TitleBar title='Coupon Validation'/>
            </div>
            <div>Restaurant Staff coupon validation</div>
        </>
    )
}

export default CouponValidation;