import React from 'react';
import { Button } from '@material-ui/core';
import axios from 'axios';

export default function UseCouponButton(props) {
    const sendCouponRequest = () => {
        if (props.coupon.status === "available"){
            axios({
                method: "POST",
                url: "requests",
                data: {
                    "type": "coupon",
                    "coupon_id": props.coupon.id,
                },
                headers: {
                    Authorization: "Bearer " + localStorage.getItem('Authorization-Token'),
                },
            });
        }
    }
    return (
        <>
            <Button 
                variant="outlined" 
                color="default" 
                onClick={sendCouponRequest}
                disabled={!(props.coupon.status === 'avaliable') ? true : false}
                style={!(props.coupon.status === 'avaliable')
                        ? { border: '#9e9e9e 2px solid' }
                        :{ border: '#000 2px solid', backgroundColor: '#FFD564'} }>
                {props.coupon.status === 'avaliable' ? "use it" : "used"}
              </Button>
        </>
    );
}