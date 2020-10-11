import React from "react";
import {
  //Button,
  Modal,
  ModalHeader,
  ModalBody,
} from "reactstrap";
import { SketchPicker } from 'react-color';

const ColorModal = (props) => {
    return (
        <Modal isOpen={props.isModalOpen} toggle={props.toggleModal}>
            <ModalHeader toggle={() => props.toggleModal(!props.isModalOpen)}>{props.headerText}</ModalHeader>
            <ModalBody style={{backgroundColor: props.color}}>
                <SketchPicker color={props.color} onChangeComplete={props.handleColor} />
            </ModalBody>
        </Modal>
    );
}

export default ColorModal;