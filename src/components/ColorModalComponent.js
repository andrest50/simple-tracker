import React, {useState} from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
} from "reactstrap";
import { SketchPicker, BlockPicker } from 'react-color';

const ColorModal = (props) => {

    //const [color, setColor] = useState("#45c7eb");

    /* const handleChangeComplete = (color) => {
        this.setState={bgColor: color.hex};
    } */

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