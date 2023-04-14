import React, { useEffect, useRef } from 'react';
import { Form, InputGroup, Button } from 'react-bootstrap';
import { ArrowRightSquare } from 'react-bootstrap-icons';

import * as yup from 'yup';
import { useFormik } from 'formik';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import leoProfanity from 'leo-profanity';
import { useRollbar } from '@rollbar/react';
import { useApiContext } from '../contexts/apiContext';
import { getCurrentChannel } from '../state';
import { useUserContext } from '../contexts/userContext';

const NewMessageForm = () => {
  const { t } = useTranslation();
  const api = useApiContext();
  const channel = useSelector(getCurrentChannel);
  const { user } = useUserContext();
  const validationSchema = yup.object().shape({
    body: yup
      .string()
      .trim()
      .required(),
  });
  const rollbar = useRollbar();
  const newMessageRef = useRef(null);

  useEffect(() => {
    newMessageRef.current.focus();
  }, [channel]);

  const f = useFormik({
    initialValues: { body: '' },
    validationSchema,
    onSubmit: async ({ body }) => {
      const filteredBody = leoProfanity.clean(body);

      const message = {
        body: filteredBody,
        channelId: channel.id,
        username: user?.username,
      };

      try {
        await api.sendMessage(message);
        f.resetForm();
      } catch (err) {
        rollbar.error(err);
        console.error(err);
      } finally {
        f.setSubmitting(false);
        newMessageRef.current.focus();
      }
    },
    validateOnBlur: false,
  });

  return (
    <Form noValidate onSubmit={f.handleSubmit} className="py-1 border rounded-2">
      <InputGroup hasValidation={!f.isValid}>
        <Form.Control
          name="body"
          aria-label={t('chat.newMessage')}
          placeholder={t('chat.newMessage')}
          className="border-0 p-0 ps-2"
          onChange={f.handleChange}
          onBlur={f.handleBlur}
          value={f.values.body}
          ref={newMessageRef}
        />
        <Button variant="group-vertical" type="submit">
          <ArrowRightSquare size={20} />
          <span className="visually-hidden">{t('chat.send')}</span>
        </Button>
      </InputGroup>
    </Form>
  );
};

export default NewMessageForm;
