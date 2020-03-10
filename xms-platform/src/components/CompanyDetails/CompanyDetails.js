import React from 'react';
import './CompanyDetails.scss';

import CompanyEditIcon from '../../assets/icons/SVG/Icon-feather-edit.svg'

const companyDetails =(props)=> {
    return (
        <div className={`companyDetailsComponent ${props.styles}`}>
            <div className="crt-ticket-company-description d-flex justify-space-between">
                <div className="create-tckt-cmpny-img d-flex">
                    <img src={props.companyLogo}></img>
                    <div className="companyNameAndDescription">
                        <p className="cmpName">{props.companyName ? props.companyName : 'Company name'}</p>
                        <p className="cmpDescription create-ticket-drawer-company-text-two">{props.companyDescription ? props.companyDescription : 'Short description'}</p>
                    </div>
                </div>
                <img className='companyEditIcon' src={CompanyEditIcon} onClick={props.onClick} alt='CompanyEditIcon'/>
            </div>
            <div className="departmentAndTeamName">
                <p className="deprt-name">{props.departmentName ? props.departmentName : 'Department Name'}</p>
                <label></label>
                <p className='tm-name'> {props.teamName ? props.teamName : 'Team Name'}</p> 
            </div>
        </div>
    ) 
}

export default companyDetails;