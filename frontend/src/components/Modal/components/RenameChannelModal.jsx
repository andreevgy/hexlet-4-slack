import { useSelector } from "react-redux";
import { useFormik } from "formik";
import {
  Modal as BootstrapModal,
  Form,
  Button,
} from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { getChannelById, getChannelsNames } from "../../../state";
import { useApiContext } from "../../../contexts/apiContext";
import getValidationSchema from "../utils/getValidationSchema";

const RenameChannelModal = ({ handleClose }) => {
  const channels = useSelector(getChannelsNames);
  const channelId = useSelector((state) => state.modalState.extra?.channelId);
  const channel = useSelector(getChannelById(channelId));
  const api = useApiContext();
  const { t } = useTranslation();

  const f = useFormik({
    initialValues: {
      name: channel.name,
    },
    validationSchema: getValidationSchema(channels),
    onSubmit: async ({ name }, { setSubmitting, setStatus }) => {
      const data = { name, id: channelId };
      try {
        getValidationSchema(channels).validateSync({ name });
        await api.renameChannel(data);
        handleClose();
      } catch (e) {
        setSubmitting(false);
        if (e.name === "ValidationError") {
          f.values.name = name;
          setStatus(e.message);
        } else if (!e.isAxiosError) {
          throw e;
        }
      }
    },
    validateOnBlur: false,
    validateOnChange: false,
  });

  return (
    <>
      <BootstrapModal.Header>
        <BootstrapModal.Title>{t("modals.rename")}</BootstrapModal.Title>
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
              placeholder={t("modals.channelName")}
            />
            <label className="visually-hidden" htmlFor="name">{t("modals.channelName")}</label>
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
                {t("modals.cancel")}
              </Button>
              <Button
                variant="primary"
                type="submit"
                disabled={f.isSubmitting}
              >
                {t("modals.submit")}
              </Button>
            </div>
          </Form.Group>
        </Form>
      </BootstrapModal.Body>
    </>
  );
};

export default RenameChannelModal;
