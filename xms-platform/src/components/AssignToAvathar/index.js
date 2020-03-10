import React from 'react';
import './theme.scss';
import decrementIcon from '../../assets/icons/SVG/Group 11399.svg'

const assignToAvathar =props=> {
    return (
        <div className='avatharContainer'>
            <img id='avathar-img' src={props.profileIcon} alt='profileIcon' />
            <span>{props.firstName} {props.lastName}</span>
            <img id='remove-img' src={decrementIcon} alt='decrementIcon' onClick={props.onClick} />
        </div> 
    )
}

export default assignToAvathar;