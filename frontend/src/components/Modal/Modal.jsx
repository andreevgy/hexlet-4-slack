import { useDispatch, useSelector } from "react-redux";
import {
  Modal as BootstrapModal,
} from "react-bootstrap";
import { actions } from "../../state";
import AddChannelModal from "./components/AddChannelModal";
import RemoveChannelModal from "./components/RemoveChannelModal";

export const modalTypes = {
  addChannel: "ADD_CHANNEL",
  removeChannel: "REMOVE_CHANNEL",
};

const modals = {
  [modalTypes.addChannel]: AddChannelModal,
  [modalTypes.removeChannel]: RemoveChannelModal,
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
