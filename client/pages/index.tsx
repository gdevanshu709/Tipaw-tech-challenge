/* eslint-disable jsx-a11y/label-has-associated-control */
import { useMutation } from '@apollo/client';
import {
  Formik, Field, Form, FormikHelpers,
} from 'formik';

import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { ADD_USER } from '../graphql/queries';

import { useAuth } from '../context/state';

import { ISignUpFromProps } from '../interfaces';

import { SignupSchema } from '../utils/validationSchemas';
import {
  FormContainer, FormError, FormHeading, FormInput,
  FormLabelCheckbox, FormSubmit, Container, FormLabel,
} from '../components/styledComponents';

function SignUpForm() {
  const router = useRouter();
  const { user } = useAuth();
  if (user) {
    router.push('/dashboard');
  }
  const [AddUser] = useMutation(ADD_USER);
  const [error, setError] = useState('');

  const signUp = async (
    values: ISignUpFromProps,
    { setSubmitting }: FormikHelpers<ISignUpFromProps>,
  ) => {
    try {
      await localStorage.removeItem('token');
      const { data } = await AddUser({
        variables: {
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          phoneNumber: values.phoneNumber,
          password: values.password,
        },
      });

      if (data) {
        localStorage.setItem('token', data.createUser.token);
        window.location.href = '/dashboard';
      }
      setSubmitting(false);
    } catch (err: any) {
      setError(err.message);
      setSubmitting(false);
    }
  };

  return (

    <Container id="signUp-form">
      <FormContainer>
        <FormHeading>Sign Up Form</FormHeading>
        <Formik
          initialValues={{
            firstName: '',
            lastName: '',
            email: '',
            phoneNumber: '',
            password: '',
            confirmPassword: '',
            accept: false,
          }}
          validationSchema={SignupSchema}
          onSubmit={signUp}
        >
          {({ errors, touched }) => (
            <Form>
              <FormInput>
                <FormLabel>Email</FormLabel>
                <Field
                  id="email"
                  name="email"
                  placeholder="Email"
                  aria-describedby="emailHelp"
                  className="form-control inputField"
                />
                {errors.email && touched.email ? (
                  <FormError id="errors-email" data-testid="errors-email">
                    {errors.email}
                  </FormError>
                ) : null}
              </FormInput>

              <FormInput>
                <FormLabel>Password</FormLabel>
                <Field
                  id="password"
                  name="password"
                  placeholder="Password"
                  type="password"
                  className="form-control inputField"
                />
                {errors.password && touched.password ? (
                  <FormError data-testid="errors-password" id="errors-password">
                    {errors.password}
                  </FormError>
                ) : null}
              </FormInput>

              <FormInput>
                <FormLabel>Confirm Password</FormLabel>
                <Field
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  type="password"
                  className="form-control inputField"
                />
                {errors.confirmPassword && touched.confirmPassword ? (
                  <FormError
                    data-testid="errors-confirmPassword"
                    id="errors-confirmPassword"
                  >
                    {errors.confirmPassword}
                  </FormError>
                ) : null}
              </FormInput>

              <FormInput>
                <FormLabel>First Name</FormLabel>
                <Field
                  id="firstName"
                  name="firstName"
                  placeholder="First Name"
                  type="text"
                  className="form-control inputField"
                />
                {errors.firstName && touched.firstName ? (
                  <FormError
                    data-testid="errors-firstName"
                    id="errors-firstName"
                  >
                    {errors.firstName}
                  </FormError>
                ) : null}
              </FormInput>

              <FormInput>
                <FormLabel>Last Name</FormLabel>
                <Field
                  id="lastName"
                  name="lastName"
                  placeholder="Last Name"
                  type="text"
                  className="form-control inputField"
                />
                {errors.lastName && touched.lastName ? (
                  <FormError data-testid="errors-lastName" id="errors-lastName">
                    {errors.lastName}
                  </FormError>
                ) : null}
              </FormInput>

              <FormInput>
                <FormLabel>Phone Number</FormLabel>
                <Field
                  id="phoneNumber"
                  name="phoneNumber"
                  placeholder="Phone Number"
                  type="text"
                  className="form-control inputField"
                />
                {errors.phoneNumber && touched.phoneNumber ? (
                  <FormError
                    data-testid="errors-phoneNumber"
                    id="errors-phoneNumber"
                  >
                    {errors.phoneNumber}
                  </FormError>
                ) : null}
              </FormInput>

              <FormLabelCheckbox className="form-group position-relative">
                <Field
                  id="accepted"
                  data-testid="accepted"
                  type="checkbox"
                  name="accept"
                  className="mr-2"
                />
                <label aria-controls="accepted" htmlFor="accepted">
                  Accepted terms & conditions
                </label>
                {errors.accept && touched.accept ? (
                  <FormError data-testid="errors-accepted" id="errors-accepted">
                    {errors.accept}
                  </FormError>
                ) : null}
              </FormLabelCheckbox>

              <FormSubmit
                id="submit"
                data-testid="signUpSubmit"
                className="w-100 border-0 mt-3"
              >
                Sign Up
              </FormSubmit>
            </Form>
          )}
        </Formik>
        {error && <FormError className="text-danger">{error}</FormError>}
      </FormContainer>
    </Container>
  );
}

export default SignUpForm;
