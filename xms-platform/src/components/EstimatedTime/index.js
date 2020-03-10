import React from 'react';
import './theme.scss';
import estimatedTimeIcon from '../../assets/icons/SVG/Icon material-access-time.svg'

let isHoursDisabled = false;
const limitLength=(e)=> {
    console.log('limiting length', e.target.value)
    console.log('e.target.value.length', e.target.value.length)
    if(e.target.value.length > 2) {
        isHoursDisabled = true
        return 0
    }
        
}

const estimatedTime = props => {
    return (
        <div className={`estimatedTimeContainer ${props.styles}`}>
            <img id='estimatedTimeIcon' src={estimatedTimeIcon} alt='estimatedTimeIcon' />
            <input type='number' disabled={isHoursDisabled} onInput={isHoursDisabled ? limitLength : null} placeholder='HH' value={props.hourse} onChange={props.handleHourChange}/>:<input type='number' placeholder='MM' value={props.minuts} onChange={props.handleMinutsChange}/>
        </div>
    )
}

export default estimatedTime;