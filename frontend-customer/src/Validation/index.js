import React from 'react';
import { Redirect } from 'react-router-dom';
import TitleBar from '../sharedComponents/TitleBar';
import Request from '../Request';

function Validation() {
    // Page direction
    if (localStorage.getItem('Authorization-Token') === null) {
        return <Redirect to="/login" />;
    }
    else if (localStorage.getItem('role').localeCompare("Customer") === 0) {
        return <Redirect to="/validation" />;
    }
    return (
        <div style={{width: '100%'}}>
            <div data-testid='title'>
                <TitleBar title='Validation'/>
            </div>
            <Request />
        </div>
        )
}

export default Validation;