import React from "react";
import { Form, InputGroup, Button } from "react-bootstrap";
import { ArrowRightSquare } from "react-bootstrap-icons";

import * as yup from "yup";
import { useFormik } from "formik";
import { useSelector } from "react-redux";
import { useApiContext } from "../contexts/apiContext";
import { getCurrentChannel } from "../state";
import { useUserContext } from "../contexts/userContext";

const NewMessageForm = () => {
  const api = useApiContext();
  const channel = useSelector(getCurrentChannel);
  const { user } = useUserContext();
  const validationSchema = yup.object().shape({
    body: yup
      .string()
      .trim()
      .required("Required"),
  });

  const f = useFormik({
    initialValues: { body: "" },
    validationSchema,
    onSubmit: async ({ body }) => {
      const message = {
        body,
        channelId: channel.id,
        username: user?.username,
      };

      try {
        await api.sendMessage(message);
        f.resetForm();
      } catch (err) {
        console.error(err);
      }
      f.setSubmitting(false);
    },
    validateOnBlur: false,
  });

  return (
    <Form noValidate onSubmit={f.handleSubmit} className="py-1 border rounded-2">
      <InputGroup hasValidation={!f.isValid}>
        <Form.Control
          name="body"
          aria-label="Введите сообщение..."
          placeholder="Введите сообщение..."
          className="border-0 p-0 ps-2"
          onChange={f.handleChange}
          onBlur={f.handleBlur}
          value={f.values.body}
        />
        <Button variant="group-vertical" type="submit">
          <ArrowRightSquare size={20} />
          <span className="visually-hidden">Отправить</span>
        </Button>
      </InputGroup>
    </Form>
  );
};

export default NewMessageForm;
