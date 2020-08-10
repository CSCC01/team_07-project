import React, { useEffect, useState }  from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import TitleBar from '../sharedComponents/TitleBar';
import Coupon from './Coupon'
import styles from './Coupon.module.css';
import Typography from '@material-ui/core/Typography';

function CouponList() {
    const [coupons, setCoupons] = useState([]);
    useEffect(() => {
        getCoupons().then(result => {
            setCoupons(result);
        });
      }, []);

    // Get coupons that the current user gained
    const getCoupons = async () => {
        const user = await axios.get('/users/me', {
            headers: {
            Authorization: 'Bearer ' + localStorage.getItem('Authorization-Token'),
          },
        });
        return await axios.get('/coupons?user.id=' + await user.data.id, {
            headers: {
            Authorization: 'Bearer ' + localStorage.getItem('Authorization-Token'),
          },
        }
        ).then(response => {
            return response.data;
        }).then(coupons => {
            if (coupons.length !== 0) {
                return coupons.map(coupon => <Coupon coupon={coupon}/>);
            } else {
                return <div style={{marginTop: 10, fontSize: '1.2rem'}}>Sorry, We do not have any coupons to show now.</div>;
            }
        }).catch(() => []);
    };

    // Redirection
    if (localStorage.getItem('Authorization-Token') === null) {
        return <Redirect to="/login" />;
    }
    else if (localStorage.getItem('role').localeCompare("Restaurant Staff") === 0) {
        return <Redirect to="/validation" />;
    }

    return (
        <div className="coupon-list">
            {/* TitleBar */}
            <div data-testid='title'>
                <TitleBar title='My coupon'/>
            </div>
            {/* Header */}
            <div className={styles.mainSection}>
                <Typography component="h2" className={styles.headline} style={{fontSize: '1.2rem'}}>
                    Coupons Available to You:
                </Typography>
            </div>
            {/* Coupons */}
            <div className={styles.container}>
                {coupons}
            </div>
        </div>
    );
}

export default CouponList;