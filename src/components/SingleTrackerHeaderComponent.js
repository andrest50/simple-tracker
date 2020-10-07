import React, {useState} from 'react'
//import { Link } from "react-router-dom";
import { Navbar, NavbarBrand, Nav, UncontrolledDropdown, 
    DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";
import TrackerValueModal from './TrackerValueModalComponent';
import {handleIncrement} from './Utils'

const SingleTrackerHeader = (props) => {
    /* const changeColorMode = () => {
        var element = document.getElementById('colorModeBtn');
        element.classList.toggle('night-mode');
    } */

    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleModal = () => {
        console.log(!isModalOpen);
        setIsModalOpen(!isModalOpen);
    }

    const setTrackerValue = (values) => {
        props.tracker.value = 0;
        console.log(parseInt(props.tracker.value + values.value));
        handleIncrement(props.tracker, values.value, props.incrementTracker);
    }

    return (
        <React.Fragment>
            <Navbar color="dark" expand="md">
                <NavbarBrand href="/" id="title">Simple Tracker</NavbarBrand>
                <Nav className="nav-bar">
                    <UncontrolledDropdown nav inNavbar className="float-right">
                        <DropdownToggle nav>
                            <i className="fa fa-cog tracker-settings"></i>
                        </DropdownToggle>
                        <DropdownMenu right>
                            <DropdownItem onClick={toggleModal}>
                                Set Tracker Value
                            </DropdownItem>
                            <TrackerValueModal setTrackerValue={setTrackerValue} toggleModal={toggleModal} isModalOpen={isModalOpen}/>
                            <DropdownItem>
                                Colors
                            </DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                </Nav>
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

export default SingleTrackerHeader;
