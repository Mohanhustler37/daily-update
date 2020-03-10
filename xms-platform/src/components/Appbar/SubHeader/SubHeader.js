import React from 'react';
import "./SubHeader.scss";
import Group133 from "../../../assets/icons/SVG/Group133.svg";
import Group134 from "../../../assets/icons/SVG/Group134.svg";
import IconFeather from "../../../assets/icons/SVG/Iconfeather-columns.svg";
import IconFeatherCalender from "../../../assets/icons/SVG/Iconfeather-calendar.svg";
import IconMaterialTimeLine from "../../../assets/icons/SVG/Iconmaterial-timeline.svg";
import IconMaterialFilterList from "../../../assets/icons/SVG/Iconmaterial-filter-list.svg";
import IconAwesomeEllipsis from "../../../assets/icons/SVG/Iconawesome-ellipsis-v.svg";

export default function SubHeader() {
    return (
        <div className="sub-header">
            <div className="sub-header-left">
                <div className="sub-header-left-content">
                    <p className="sub-header-text">Tasks</p>
                    <div className="dropdown-button">
                        <button type="button" className="btn dropdown-toggle" data-toggle="dropdown">Today</button>
                        <div className="dropdown-menu">
                            <a className="dropdown-item" href="#">yesterday</a>
                            <a className="dropdown-item active" href="#">Tomorrow</a>
                        </div>
                    </div>
                </div>
                <div>
                    <p className="sub-header-left-bottom-text">300 tasks for today</p>
                </div>
            </div>

            <div className="sub-header-right">
                <div className="sub-header-icon-one">
                    <img src={Group134}></img>  
                </div>
                <div className="sub-header-icon">
                    <img src={Group133}></img>
                </div>
                <div className="sub-header-icon">
                    <img src={IconFeather}></img>
                </div>
                <div className="sub-header-icon">
                    <img src={IconFeatherCalender}></img>
                </div>
                <div className="sub-header-icon">
                    <img src={IconMaterialTimeLine}></img>
                </div>
                <div className="sub-header-icon1">
                    <button type="button" className="btn"> <span><img src={IconMaterialFilterList}></img></span>Filters</button>
                </div>
                <div className="sub-header-icon">
                    <img src={IconAwesomeEllipsis}></img>
                </div>

            </div>

        </div>
    )
}