import React from 'react';
import { Button } from '@material-ui/core';

export default function UseCouponButton(props) {
    return (
        <>
            <Button 
                variant="outlined" 
                color="default" 
                disabled={!props.isAvailable ? true : false}
                style={!props.isAvailable
                        ? { border: '#9e9e9e 2px solid' }
                        :{ border: '#000 2px solid', backgroundColor: '#FFD564'} }>
                {props.isAvailable ? "use it" : "used"}
              </Button>
        </>
    );
}