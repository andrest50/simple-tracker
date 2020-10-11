import React, { useState } from "react";
//import { Link } from "react-router-dom";
import {
  Navbar,
  NavbarBrand,
  Nav,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import TrackerValueModal from "../modals/TrackerValueModalComponent";
import { handleIncrement } from "../Utils";
import ColorModal from "../modals/ColorModalComponent";

const SingleTrackerHeader = (props) => {
  /* const changeColorMode = () => {
        var element = document.getElementById('colorModeBtn');
        element.classList.toggle('night-mode');
    } */

  const [isValueModalOpen, setIsValueModalOpen] = useState(false);
  const [isBgColorModalOpen, setIsBgColorModalOpen] = useState(false);
  const [isIncColorModalOpen, setIsIncColorModalOpen] = useState(false);
  const [isHistoryColorModalOpen, setIsHistoryColorModalOpen] = useState(false);

  const toggleValueModal = () => {
    console.log(!isValueModalOpen);
    setIsValueModalOpen(!isValueModalOpen);
  };

  const toggleBgColorModal = () => {
    console.log(!isBgColorModalOpen);
    if(isBgColorModalOpen){
        props.updateSetting(props.tracker);
    }
    setIsBgColorModalOpen(!isBgColorModalOpen);
  };

  const toggleIncColorModal = () => {
    console.log(!isIncColorModalOpen);
    if(isIncColorModalOpen){
        props.updateSetting(props.tracker);
    }
    setIsIncColorModalOpen(!isIncColorModalOpen);
  };

  const toggleHistoryColorModal = () => {
    console.log(!isHistoryColorModalOpen);
    if(isHistoryColorModalOpen){
        props.updateSetting(props.tracker);
    }
    setIsHistoryColorModalOpen(!isHistoryColorModalOpen);
  };

  const setTrackerValue = (values) => {
    props.tracker.value = 0;
    console.log(parseInt(props.tracker.value + values.value));
    handleIncrement(props.tracker, values.value, props.updateTracker);
  };

  var settings = props.tracker.settings;

  return (
    <React.Fragment>
      <Navbar color="dark" expand="md">
        <NavbarBrand href="/" id="title">
          Simple Tracker
        </NavbarBrand>
        <Nav className="nav-bar">
          <UncontrolledDropdown nav inNavbar className="float-right">
            <DropdownToggle nav>
              <i className="fa fa-cog tracker-settings"></i>
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem onClick={toggleValueModal}>
                Set Tracker Value
              </DropdownItem>
              <TrackerValueModal
                setTrackerValue={setTrackerValue}
                toggleModal={toggleValueModal}
                isModalOpen={isValueModalOpen}
              />
              <DropdownItem onClick={toggleBgColorModal}>Background Color</DropdownItem>
              <ColorModal
                toggleModal={toggleBgColorModal}
                isModalOpen={isBgColorModalOpen}
                color={settings.bgColor}
                handleColor={props.handleBgColor}
                headerText="Background Color"
              />
              <DropdownItem onClick={toggleIncColorModal}>Increment Buttons Color</DropdownItem>
              <ColorModal
                toggleModal={toggleIncColorModal}
                isModalOpen={isIncColorModalOpen}
                color={settings.incColor}
                handleColor={props.handleIncColor}
                headerText="Increment Color"
              />
              <DropdownItem onClick={toggleHistoryColorModal}>History Background Color</DropdownItem>
              <ColorModal
                toggleModal={toggleHistoryColorModal}
                isModalOpen={isHistoryColorModalOpen}
                color={settings.historyColor}
                handleColor={props.handleHistoryColor}
                headerText="Increment Color"
              />
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
  );
};

export default SingleTrackerHeader;
