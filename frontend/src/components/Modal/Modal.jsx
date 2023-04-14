import { useDispatch, useSelector } from "react-redux";
import {
  Modal as BootstrapModal,
} from "react-bootstrap";
import { actions } from "../../state";
import AddChannelModal from "./components/AddChannelModal";

export const modalTypes = {
  addChannel: "ADD_CHANNEL",
};

const modals = {
  [modalTypes.addChannel]: AddChannelModal,
};

const Modal = () => {
  const dispatch = useDispatch();
  const isOpened = useSelector((state) => state.modalState.isOpened);
  const modalType = useSelector((state) => state.modalState.type);

  const handleClose = () => {
    dispatch(actions.closeModal());
  };

  const Component = modals[modalType];

  return (
    <BootstrapModal show={isOpened} onHide={handleClose} centered>
      {Component && <Component handleClose={handleClose} />}
    </BootstrapModal>
  );
};

export default Modal;
