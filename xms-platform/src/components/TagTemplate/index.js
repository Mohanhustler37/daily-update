import React from 'react';
import './theme.scss';
import decrementIcon from '../../assets/icons/SVG/Group-11399 (1).svg';

const tagTemplate = props => {
    return (
        <p className={`selectedTag ${props.styles}`}>
            {props.tagTitle} 
            <img className='removeTagIcon' src={decrementIcon} alt='decrementIcon' onClick={props.removeHandler}
        /></p>
    )
}

export default tagTemplate;