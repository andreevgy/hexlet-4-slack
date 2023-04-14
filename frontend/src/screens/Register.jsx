import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useFormik } from "formik";
import { Button, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useTranslation } from "react-i18next";
import { useRollbar } from "@rollbar/react";
import { useUserContext } from "../contexts/userContext";
import paths from "../paths";
import avatarImages from "../assets/register_image.jpg";

const Register = () => {
  const { logIn } = useUserContext();
  const [registrationFailed, setRegistrationFailed] = useState(false);
  const navigate = useNavigate();
  const validationSchema = yup.object().shape({
    username: yup
      .string()
      .trim()
      .required("Обязательное поле")
      .min(3, "Имя пользователя должно быть минимум 3 символа")
      .max(20, "Имя пользователя должно быть максимум 20 символов"),
    password: yup
      .string()
      .trim()
      .required("Обязательное поле")
      .min(6, "Пароль должен быть минимум 6 символом"),
    confirmPassword: yup
      .string()
      .test("confirmPassword", "Пароли должны совпадать", (value, context) => value === context.parent.password),
  });
  const { t } = useTranslation();
  const rollbar = useRollbar();
  const usernameRef = useRef(null);

  useEffect(() => {
    usernameRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      setRegistrationFailed(false);

      try {
        const res = await axios.post(
          paths.api.signupPath,
          { username: values.username, password: values.password },
        );
        logIn(res.data);
        navigate(paths.app.chatPagePath);
      } catch (err) {
        usernameRef.current.focus();
        if (!err.isAxiosError) {
          rollbar.error(err);
          throw err;
        }

        if (err.response.status === 409) {
          setRegistrationFailed(true);
          return;
        }

        rollbar.error(err);
        throw err;
      }
    },
  });

  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <div className="card shadow-sm">
            <div className="card-body d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
              <div>
                <img
                  src={avatarImages}
                  className="rounded-circle"
                  alt={t("signup.header")}
                />
              </div>
              <Form onSubmit={formik.handleSubmit} className="w-50">
                <h1 className="text-center mb-4">{t("signup.header")}</h1>
                <Form.Group className="form-floating mb-3">
                  <Form.Control
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.username}
                    placeholder={t("signup.usernameConstraints")}
                    name="username"
                    id="username"
                    autoComplete="username"
                    ref={usernameRef}
                    isInvalid={
                      (formik.errors.username && formik.touched.username)
                      || registrationFailed
                    }
                    required
                  />
                  <Form.Label htmlFor="username">{t("signup.username")}</Form.Label>
                  <Form.Control.Feedback type="invalid" tooltip placement="right">
                    {t(formik.errors.username)}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="form-floating mb-3">
                  <Form.Control
                    type="password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                    placeholder={t("signup.passMin")}
                    name="password"
                    id="password"
                    aria-describedby="passwordHelpBlock"
                    isInvalid={
                      (formik.errors.password && formik.touched.password)
                      || registrationFailed
                    }
                    required
                    autoComplete="new-password"
                  />
                  <Form.Control.Feedback type="invalid" tooltip>
                    {t(formik.errors.password)}
                  </Form.Control.Feedback>
                  <Form.Label htmlFor="password">{t("signup.password")}</Form.Label>
                </Form.Group>
                <Form.Group className="form-floating mb-4">
                  <Form.Control
                    type="password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.confirmPassword}
                    placeholder={t("signup.mustMatch")}
                    name="confirmPassword"
                    id="confirmPassword"
                    isInvalid={
                      (formik.errors.confirmPassword && formik.touched.confirmPassword)
                      || registrationFailed
                    }
                    required
                    autoComplete="new-password"
                  />
                  <Form.Control.Feedback type="invalid" tooltip>
                    {registrationFailed
                      ? t("signup.alreadyExists")
                      : t(formik.errors.confirmPassword)}

                  </Form.Control.Feedback>
                  <Form.Label htmlFor="confirmPassword">{t("signup.confirm")}</Form.Label>
                </Form.Group>
                <Button type="submit" variant="outline-primary" className="w-100">{t("signup.submit")}</Button>
              </Form>
            </div>
            <div className="card-footer p-4">
              <div className="text-center">
                <span>{t("signup.alreadyRegistered")}</span>
                {" "}
                <Link to="/login">{t("signup.login")}</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
