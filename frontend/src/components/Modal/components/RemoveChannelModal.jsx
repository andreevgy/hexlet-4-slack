import { useState } from "react";
import { useSelector } from "react-redux";
import {
  Modal as BootstrapModal,
  Button,
} from "react-bootstrap";
import { useApiContext } from "../../../contexts/apiContext";

const RemoveChannelForm = ({ handleClose }) => {
  const [loading, setLoading] = useState(false);
  const api = useApiContext();
  const channelId = useSelector((state) => state.modalState.extra?.channelId);
  const handleRemove = async () => {
    setLoading(true);
    try {
      await api.removeChannel({ id: channelId });
      handleClose();
    } catch (e) {
      setLoading(false);
    }
  };

  return (
    <>
      <BootstrapModal.Header>
        <BootstrapModal.Title>Удалить канал</BootstrapModal.Title>
        <Button
          variant="close"
          type="button"
          onClick={handleClose}
          aria-label="Close"
          data-bs-dismiss="modal"
        />
      </BootstrapModal.Header>
      <BootstrapModal.Body>
        <p className="lead">Подтвердите удаление канала</p>
        <div className="d-flex justify-content-end">
          <Button
            className="me-2"
            variant="secondary"
            type="button"
            onClick={handleClose}
            disabled={loading}
          >
            Отменить
          </Button>
          <Button
            variant="danger"
            type="button"
            onClick={handleRemove}
            disabled={loading}
          >
            Подтвердить
          </Button>
        </div>
      </BootstrapModal.Body>
    </>
  );
};

export default RemoveChannelForm;
