import React from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
} from "reactstrap";
import { SketchPicker } from 'react-color';

const ColorModal = (props) => {
    return (
        <Modal isOpen={props.isModalOpen} toggle={props.toggleModal}>
            <ModalHeader toggle={() => props.toggleModal(!props.isModalOpen)}>Color Palette</ModalHeader>
            <ModalBody>
                <SketchPicker />
            </ModalBody>
        </Modal>
    );
}

export default ColorModal;