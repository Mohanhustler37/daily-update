import React from 'react';
import './theme.scss';

import Radio from '@material-ui/core/Radio';

const profileItemWithRadio = props => {
    let { mainContainer, placeholder, radioStyle, profileIcon } = props.styles;
    return (
        <div className={`profileItemWithCheckBoxContainer ${mainContainer}`}>
            <div className={`assign-item-avatar `}>
                <div className={`imageAndNameWrapper `} onClick={props.onClick}>
                    {props.profileIcon ? <img className={profileIcon} src={props.profileIcon} alt='profileIcon' /> : <></>} 
                    <span className={`${placeholder}`}>{props.valueOne} {props.valueTwo}</span>
                </div>
                <Radio className={radioStyle} checked={props.checked} />
            </div>
        </div>
    )
}

export default profileItemWithRadio;