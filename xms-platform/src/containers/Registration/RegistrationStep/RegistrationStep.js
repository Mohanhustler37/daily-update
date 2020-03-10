import React from 'react';
import './RegistrationStep.scss'

import TextField from '@material-ui/core/TextField';


const RegistrationStep = props => {
    console.log('props_props', props)
    return (
        <div className='RegistrationStep-container'>
            <div className="registration-field-one">
                {/* <InputBase
                    placeholder="Work Email"
                    className="registration-input"
                    name="email"
                    value={state.emailIs}
                    onChange={handleChange('emailIs')}
                    inputProps={{ 'aria-label': 'search' }}
                /> */}

                <TextField
                    id="outlined-basic"
                    className='customised-login-field'
                    label="Email"
                    margin="normal"
                    variant="outlined"
                    required
                    error={
                        (props.emailIs.length > 0 && props.isInValidEmail.isInValidEmail)
                            || props.userExist.userExist
                            ? 'error-while-login' : null
                    }
                    name="emailIs"
                    onChange={props.onChange}
                    value={props.emailIs}
                />

                {/* {
                    state.emailIs.length > 0 && isInValidEmail ?
                        <i class="fa fa-exclamation-circle" aria-hidden="true"></i> : null
                } */}
                {
                    props.emailIs.length > 0 && props.isInValidEmail.isInValidEmail ?
                        <p className='error-email-popup'>Please enter a valid email address.</p> : null
                }

                {
                    props.userExist.userExist ?
                        <p className='error-email-popup'>User already exists. Please try with other email.</p> : null
                }
            </div>
        </div>
    )
}

export default RegistrationStep;