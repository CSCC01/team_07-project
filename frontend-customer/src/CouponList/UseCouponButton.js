import React from 'react';
import { Button } from '@material-ui/core';
import Popup from 'reactjs-popup';
import IconButton from '@material-ui/core/IconButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

export default function UseCouponButton(props) {
    const sendCouponRequest = () => {
        if (props.coupon.status === "available"){
            axios({
                method: "POST",
                url: "/requests",
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
        <Popup
          trigger={
            <div>
              <Button 
                variant="outlined" 
                color="default" 
                disabled={!(props.coupon.status === 'available') ? true : false}
                style={!(props.coupon.status === 'available')
                        ? { border: '#9e9e9e 2px solid' }
                        :{ border: '#000 2px solid', backgroundColor: '#FFD564'} }>
                {props.coupon.status === 'available' ? "use it" : "used"}
              </Button>
            </div>
          }
          disabled={props.coupon.status !== 'available' ? true : false}
          modal
          closeOnDocumentClick
          contentStyle={{
            width: '70%',
            height: 'fit-content',
            borderRadius: '20px',
            border: '#000 2px solid',
          }}
        >
          {(close) => (
            // The content of the popup
            <div style={{ margin: 20, marginTop: 50, textAlign: 'center' }}>
              {/* The cross button on the top right */}
              <IconButton style={{ position: 'absolute', top: 10, right: 10 }} onClick={close}>
                <FontAwesomeIcon icon={faTimes} style={{ marginLeft: 3, marginRight: 3 }} />
              </IconButton>
              <p style={{ fontSize: '1.2em', marginTop: 10 }}>Are you sure you want to <span className="request-highlight">redeem</span> this coupon?</p>
              <Button variant="outlined" color="#000" onClick={()=>{close();sendCouponRequest();}} 
              style={{ border: '#000 2px solid', backgroundColor: '#FFD564'}}>
                Yes
              </Button>
            </div>
          )}
        </Popup>
        </>
    );
}