import { useMutation } from '@apollo/client';
import {
  Formik, Field, Form, FormikHelpers,
} from 'formik';
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { LOGIN_USER } from '../../graphql/queries';

import { useAuth } from '../../context/state';

import { ILoginFormProps } from '../../interfaces';
import { LoginSchema } from '../../utils/validationSchemas';
import { FormContainer, Container } from '../../components/styledComponents';

function LoginForm() {
  const router = useRouter();

  // get user login status from context
  const { user, login } = useAuth();

  // If user is already logged in redirect to dashboard
  if (user) {
    router.push('/dashboard');
  }

  // get login mutation from apollo client
  const [LoginUser] = useMutation(LOGIN_USER);

  // set initial state
  const [error, setError] = useState('');
  // login user
  const onLogin = async (
    values: ILoginFormProps,
    { setSubmitting }: FormikHelpers<ILoginFormProps>,
  ) => {
    try {
      // login user
      await localStorage.removeItem('token');
      const { data } = await LoginUser({
        variables: {
          email: values.email,
          password: values.password,
        },
      });
      if (data) {
        localStorage.setItem('token', data.login.token);
        login();
      }
      setSubmitting(false);
    } catch (err: any) {
      setError(err.message);
      setSubmitting(false);
    }
  };
  return (
    <Container className=" p-3">
      <FormContainer>
        <h1 className="display-6 mb-3">Login</h1>
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          validationSchema={LoginSchema}
          onSubmit={onLogin}
        >
          <Form>
            <div className="mb-3">
              <Field
                className="form-control"
                id="email"
                name="email"
                placeholder="email"
                aria-describedby="emailHelp"
              />
            </div>

            <div className="mb-3">
              <Field
                className="form-control"
                id="password"
                name="password"
                placeholder="Password"
                type="password"
              />
            </div>

            <button type="submit" className="btn btn-primary">
              Login
            </button>
          </Form>
        </Formik>
        {error && <div className="text-danger">{error}</div>}
      </FormContainer>
    </Container>
  );
}

export default LoginForm;
