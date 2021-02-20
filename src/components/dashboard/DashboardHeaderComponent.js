import React from 'react'
//import { Link } from "react-router-dom";
import { Navbar, NavbarBrand } from "reactstrap";

function DashboardHeader() {
    return (
        <React.Fragment>
            <Navbar color="dark" expand="md">
                <NavbarBrand href="/" id="title">Simple Tracker</NavbarBrand>
            </Navbar>
            <div id="description">
                <h5>This is a website for creating, and maintaining, many trackers</h5>
            </div>
        </React.Fragment>
    )
}

export default DashboardHeader;
