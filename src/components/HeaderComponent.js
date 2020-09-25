import React from 'react'
import { Link } from "react-router-dom";
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from "reactstrap";

function Header() {
    /* const changeColorMode = () => {
        var element = document.getElementById('colorModeBtn');
        element.classList.toggle('night-mode');
    } */
    return (
        <React.Fragment>
            <Navbar color="dark" expand="md">
                <NavbarBrand href="/" id="title">Simple Tracker</NavbarBrand>
                {/* <Nav navbar>
                    <NavItem>
                        <NavLink href="/" id="navbar-btn">Dashboard</NavLink>
                    </NavItem>
                </Nav> */}
            </Navbar>
            <div id="description">
                <h5>This is a website for creating, and maintaining, many trackers</h5>
            </div>
        </React.Fragment>
    )
}

export default Header;
