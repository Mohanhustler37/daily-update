import React from 'react';
import './theme.scss';

import Checkbox from '@material-ui/core/Checkbox';

const profileItemWithCheckBox =props=>{
    return (
        <div className={`profileItemWithCheckBoxContainer ${props.styles}`}>
            <div className='assign-item-avatar'>
                <div className='imageAndNameWrapper' onClick={props.onClick}>
                    {props.profileIcon ? <img src={props.profileIcon} alt='profileIcon' /> : <></>} 
                    <span>{props.firstName} {props.lastName}</span>
                </div>
                <Checkbox className='customeCheckBoxStyle' name='assignToChecked' onChange={props.onChange} checked={props.checked} />
            </div>
        </div>
    )
}

export default profileItemWithCheckBox;