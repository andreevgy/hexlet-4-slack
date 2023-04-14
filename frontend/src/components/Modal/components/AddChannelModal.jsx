import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import {
  Modal as BootstrapModal,
  Form,
  Button,
} from "react-bootstrap";
import { actions, getChannelsNames } from "../../../state";
import { useApiContext } from "../../../contexts/apiContext";
import getValidationSchema from "../utils/getValidationSchema";

const AddChannelModal = ({ handleClose }) => {
  const channels = useSelector(getChannelsNames);
  const api = useApiContext();
  const dispatch = useDispatch();

  const f = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: getValidationSchema(channels),
    onSubmit: async ({ name }, { setSubmitting, setStatus }) => {
      const channel = { name };
      try {
        getValidationSchema(channels).validateSync({ name });
        const data = await api.createChannel(channel);
        dispatch(actions.setCurrentChannel({ channelId: data.id }));
        handleClose();
      } catch (e) {
        setSubmitting(false);
        if (e.name === "ValidationError") {
          setStatus("Ошибка валидации");
        }
      }
    },
    validateOnBlur: false,
    validateOnChange: false,
  });

  return (
    <>
      <BootstrapModal.Header>
        <BootstrapModal.Title>Создать канал</BootstrapModal.Title>
        <Button
          variant="close"
          type="button"
          onClick={handleClose}
          aria-label="Close"
          data-bs-dismiss="modal"
        />
      </BootstrapModal.Header>
      <BootstrapModal.Body>
        <Form onSubmit={f.handleSubmit}>
          <Form.Group>
            <Form.Control
              className="mb-2"
              disabled={f.isSubmitting}
              onChange={f.handleChange}
              onBlur={f.handleBlur}
              value={f.values.name}
              isInvalid={(f.errors.name && f.touched.name) || !!f.status}
              name="name"
              id="name"
              placeholder="Название канала"
            />
            <label className="visually-hidden" htmlFor="name">Название канала</label>
            <Form.Control.Feedback type="invalid">
              {f.errors.name || f.status}
            </Form.Control.Feedback>
            <div className="d-flex justify-content-end">
              <Button
                className="me-2"
                variant="secondary"
                type="button"
                onClick={handleClose}
              >
                Отмена
              </Button>
              <Button
                variant="primary"
                type="submit"
                disabled={f.isSubmitting}
              >
                Создать
              </Button>
            </div>
          </Form.Group>
        </Form>
      </BootstrapModal.Body>
    </>
  );
};

export default AddChannelModal;
