import React, { Component } from "react";
import Appbar from "../Appbar/Appbar";
import './Layout.scss';
import SideNavbar from "../Appbar/SideNavbar/SideNavbar";

class Layout extends Component {
    render() {
        return (
            <div>
                <Appbar />
                <div className="bodysection">
                    <div className="ticketing-side-navbar-table-merge">
                        <SideNavbar />
                    </div>

                    <div className="main-app-wrapper">{this.props.children}</div>
                </div>
            </div>
        );
    }
}

export default Layout; 
