import React from 'react';
import './theme.scss';

import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import loadingSpinner from '../../assets/icons/SVG/loadingSpinner.gif';


function FooterButton (props) {
    return(
        <div className='create-drawer-footer-section'>
        <div className="crt-drawer-chck-bx">
          <Checkbox className='crt-drawer-save-as-an-Idea-checkbox' checked={props.checked} onChange={props.onChange}/>
          <span className="ctr-drawer-text">{props.label}</span>
        </div>
        <div className="crt-drawer-sbmt-btn">
          <Button variant="contained" className="ctr-drawer-submit-button" onClick={props.onClick}>
            {!props.isSpinnerLoading ? props.buttonName : <img src={loadingSpinner} alt='loadingSpinner' /> }
          </Button>
        </div>
        </div>
    );
}

export default FooterButton;