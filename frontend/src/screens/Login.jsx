import { useFormik } from 'formik';
import { Button, Form } from 'react-bootstrap';
import loginImage from '../assets/login_image.jpg';

const Login = () => {
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async (values) => {
      console.log(values)
    },
  });

  return <div className="container-fluid h-100">
    <div className="row justify-content-center align-content-center h-100">
      <div className="col-12 col-md-8 col-xxl-6">
        <div className="card shadow-sm">
          <div className="card-body row p-5">
            <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
              <img
                src={loginImage}
                className="rounded-circle"
                alt="Войти"
              />
            </div>
            <Form onSubmit={formik.handleSubmit} className="col-12 col-md-6 mt-3 mt-mb-0">
              <h1 className="text-center mb-4">Войти</h1>
              <Form.Group className="form-floating mb-3">
                <Form.Control
                  onChange={formik.handleChange}
                  value={formik.values.username}
                  name="username"
                  id="username"
                  autoComplete="username"
                  required
                  placeholder="Ваш ник"
                />
                <label htmlFor="username">Ваш ник</label>
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
                  placeholder="Пароль"
                />
                <Form.Label htmlFor="password">Пароль</Form.Label>
              </Form.Group>
              <Button type="submit" variant="outline-primary" className="w-100 mb-3">Войти</Button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  </div>

}

export default Login;