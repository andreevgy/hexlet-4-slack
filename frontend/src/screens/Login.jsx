import { useFormik } from 'formik';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useRollbar } from '@rollbar/react';
import paths from '../paths';
import loginImage from '../assets/login_image.jpg';
import { useUserContext } from '../contexts/userContext';

const Login = () => {
  const navigate = useNavigate();
  const [isAuthFailed, setIsAuthFailed] = useState(false);
  const { logIn } = useUserContext();
  const { t } = useTranslation();
  const rollbar = useRollbar();
  const usernameRef = useRef(null);

  useEffect(() => {
    usernameRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async (values) => {
      setIsAuthFailed(false);
      try {
        const res = await axios.post(paths.api.loginPath, values);
        logIn(res.data);
        navigate(paths.app.chatPagePath);
      } catch (err) {
        usernameRef.current.focus();
        if (!err.isAxiosError) {
          rollbar.error(err);
          toast.error(t('errors.unknown'));
          return;
        }

        if (err.response?.status === 401) {
          setIsAuthFailed(true);
        } else {
          rollbar.error(err);
          toast.error(t('errors.network'));
        }
      }
    },
  });

  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <div className="card shadow-sm">
            <div className="card-body row p-5">
              <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                <img
                  src={loginImage}
                  className="rounded-circle"
                  alt={t('login.header')}
                />
              </div>
              <Form onSubmit={formik.handleSubmit} className="col-12 col-md-6 mt-3 mt-mb-0">
                <h1 className="text-center mb-4">{t('login.header')}</h1>
                <Form.Group className="form-floating mb-3">
                  <Form.Control
                    onChange={formik.handleChange}
                    value={formik.values.username}
                    name="username"
                    id="username"
                    autoComplete="username"
                    required
                    isInvalid={isAuthFailed}
                    ref={usernameRef}
                    placeholder={t('login.username')}
                  />
                  <label htmlFor="username">{t('login.username')}</label>
                </Form.Group>
                <Form.Group className="form-floating mb-4">
                  <Form.Control
                    type="password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    name="password"
                    id="password"
                    autoComplete="current-password"
                    required
                    isInvalid={isAuthFailed}
                    placeholder={t('login.password')}
                  />
                  <Form.Label htmlFor="password">{t('login.password')}</Form.Label>
                  {isAuthFailed && (
                  <Form.Control.Feedback type="invalid" tooltip>
                    {t('login.authFailed')}
                  </Form.Control.Feedback>
                  )}
                </Form.Group>
                <Button type="submit" variant="outline-primary" className="w-100 mb-3">{t('login.submit')}</Button>
              </Form>
            </div>
            <div className="card-footer p-4">
              <div className="text-center">
                <span>{t('login.newToChat')}</span>
                {' '}
                <Link to="/signup">{t('login.signup')}</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
