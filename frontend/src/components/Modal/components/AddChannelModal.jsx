import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import {
  Modal as BootstrapModal,
  Form,
  Button,
} from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import leoProfanity from "leo-profanity";
import { useRollbar } from "@rollbar/react";
import { useEffect, useRef } from "react";
import { actions, getChannelsNames } from "../../../state";
import { useApiContext } from "../../../contexts/apiContext";
import getValidationSchema from "../utils/getValidationSchema";

const AddChannelModal = ({ handleClose }) => {
  const channels = useSelector(getChannelsNames);
  const api = useApiContext();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const rollbar = useRollbar();
  const channelNameRef = useRef(null);

  useEffect(() => {
    channelNameRef.current.focus();
  }, []);

  const f = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: getValidationSchema(channels),
    onSubmit: async ({ name }, { setSubmitting, setStatus }) => {
      const filteredName = leoProfanity.clean(name);
      const channel = { name: filteredName };
      try {
        getValidationSchema(channels).validateSync(channel);
        const data = await api.createChannel(channel);
        dispatch(actions.setCurrentChannel({ channelId: data.id }));
        toast.success(t("channels.created"));
        handleClose();
      } catch (e) {
        rollbar.error(e);
        setSubmitting(false);
        channelNameRef.current.focus();
        if (e.name === "ValidationError") {
          f.values.name = filteredName;
          setStatus(e.message);
        } else if (!e.isAxiosError) {
          rollbar.error(e);
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
        <BootstrapModal.Title>{t("modals.add")}</BootstrapModal.Title>
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
              ref={channelNameRef}
              id="name"
              placeholder={t("modals.channelName")}
            />
            <label className="visually-hidden" htmlFor="name">{t("modals.channelName")}</label>
            <Form.Control.Feedback type="invalid">
              {t(f.errors.name) || t(f.status)}
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

export default AddChannelModal;
