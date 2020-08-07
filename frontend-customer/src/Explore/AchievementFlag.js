import React from 'react';
import FlagIcon from '@material-ui/icons/Flag';

import './AchievementFlag.css'

export default function AchievementFlag(props){
    return(
        <div className='flag'>
            <FlagIcon fontSize="large"/>
            <div className='flag-texts'>
                <p className='flag-text'>{props.restaurantName}</p>
                <p className='flag-text'>Completed {props.number} promotions</p>
            </div>
        </div>
    )
}