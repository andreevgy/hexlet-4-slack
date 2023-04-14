import axios from "axios";
import React, { useState } from "react";
import { useFormik } from "formik";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
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
        if (!err.isAxiosError) {
          throw err;
        }

        if (err.response.status === 409) {
          setRegistrationFailed(true);
          return;
        }

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
                  alt="Регистрация"
                />
              </div>
              <Form onSubmit={formik.handleSubmit} className="w-50">
                <h1 className="text-center mb-4">Регистрация</h1>
                <Form.Group className="form-floating mb-3">
                  <Form.Control
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.username}
                    placeholder="Имя пользователя"
                    name="username"
                    id="username"
                    autoComplete="username"
                    isInvalid={
                      (formik.errors.username && formik.touched.username)
                      || registrationFailed
                    }
                    required
                  />
                  <Form.Label htmlFor="username">Имя пользователя</Form.Label>
                  <Form.Control.Feedback type="invalid" tooltip placement="right">
                    {formik.errors.username}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="form-floating mb-3">
                  <Form.Control
                    type="password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                    placeholder="Пароль"
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
                    {formik.errors.password}
                  </Form.Control.Feedback>
                  <Form.Label htmlFor="password">Пароль</Form.Label>
                </Form.Group>
                <Form.Group className="form-floating mb-4">
                  <Form.Control
                    type="password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.confirmPassword}
                    placeholder="Подтверждение пароля"
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
                      ? "Имя пользователя уже занято"
                      : "Пароли не совпадают"}
                  </Form.Control.Feedback>
                  <Form.Label htmlFor="confirmPassword">Подтверждение пароля</Form.Label>
                </Form.Group>
                <Button type="submit" variant="outline-primary" className="w-100">Зарегистрироваться</Button>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
