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
import TrackerIncValueModal from "../modals/TrackerIncValueModal"
import { handleIncrement } from "../Utils";
import ColorModal from "../modals/ColorModalComponent";
import TrackerRenameModal from "../modals/TrackerRenameModal";

const SingleTrackerHeader = (props) => {

  const [isValueModalOpen, setIsValueModalOpen] = useState(false);
  const [isIncValueModalOpen, setIsIncValueModalOpen] = useState(false);
  const [isRenameModalOpen, setIsRenameModalOpen] = useState(false);
  const [isBgColorModalOpen, setIsBgColorModalOpen] = useState(false);
  const [isIncColorModalOpen, setIsIncColorModalOpen] = useState(false);
  const [isHistoryColorModalOpen, setIsHistoryColorModalOpen] = useState(false);

  const toggleValueModal = () => {
    setIsValueModalOpen(!isValueModalOpen);
  };

  const toggleIncValueModal = () => {
    setIsIncValueModalOpen(!isIncValueModalOpen);
  };

  const toggleRenameModal = () => {
    setIsRenameModalOpen(!isRenameModalOpen);
  };

  const toggleBgColorModal = () => {
    if(isBgColorModalOpen){
        props.updateSetting(props.tracker);
    }
    setIsBgColorModalOpen(!isBgColorModalOpen);
  };

  const toggleIncColorModal = () => {
    if(isIncColorModalOpen){
        props.updateSetting(props.tracker);
    }
    setIsIncColorModalOpen(!isIncColorModalOpen);
  };

  const toggleHistoryColorModal = () => {
    if(isHistoryColorModalOpen){
        props.updateSetting(props.tracker);
    }
    setIsHistoryColorModalOpen(!isHistoryColorModalOpen);
  };

  const setTrackerValue = (values) => {
    props.tracker.value = 0;
    handleIncrement(props.tracker, values.value, props.updateTracker);
  };

  const incTrackerValue = (values) => {
    handleIncrement(props.tracker, parseInt(values.value), props.updateTracker);
  };

  const setTrackerName = (values) => {
    props.tracker.name = values.name;
    props.updateTracker(props.tracker);
  }

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
              <DropdownItem header>Tracker</DropdownItem>
              <DropdownItem onClick={toggleValueModal}>
                Set Tracker Value
              </DropdownItem>
              <TrackerValueModal
                setTrackerValue={setTrackerValue}
                toggleModal={toggleValueModal}
                isModalOpen={isValueModalOpen}
              />
              <DropdownItem onClick={toggleIncValueModal}>
                Increment Tracker Value
              </DropdownItem>
              <TrackerIncValueModal
                incTrackerValue={incTrackerValue}
                toggleModal={toggleIncValueModal}
                isModalOpen={isIncValueModalOpen}
              />
              <DropdownItem onClick={toggleRenameModal}>
                Rename Tracker
              </DropdownItem>
              <TrackerRenameModal
                setTrackerName={setTrackerName}
                toggleModal={toggleRenameModal}
                isModalOpen={isRenameModalOpen}
              />
              <DropdownItem divider />
              <DropdownItem header>Colors</DropdownItem>
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
              <DropdownItem onClick={toggleHistoryColorModal}>Sections Background Color</DropdownItem>
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
      </Navbar>
      <div id="description">
        <h5>This is a website for creating, and maintaining, many trackers</h5>
      </div>
    </React.Fragment>
  );
};

export default SingleTrackerHeader;
