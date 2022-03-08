import * as yup from 'yup';

/**
 * USER MODEL Validation Rules
 */

const phoneNumber = yup
    .string()
    .required('Username is required.')
    .min(10, 'Username should have at least 10 characters.')
    .max(12, 'Username should have a tmost 12 characters.');

const firstName = yup
    .string()
    .required('First Name is required.')
    .min(3, 'First name should have atleast 3 characters.');

const lastName = yup
    .string()
    .required('Last name is required.')
    .min(3, 'Last name should have atleast 3 characters.');

const email = yup
    .string()
    .required('Email is required.')
    .email('Invalid email.');

   const password= yup.string()
    .required('Required').min(8, 'Password too short')
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character',
    );

// User Registration Validation Schema
export const UserRegistrationRules = yup.object().shape({
    email,
    password,
    firstName,
    lastName,
    phoneNumber,
});

// User Authentication Validation Schema
export const UserAuthenticationRules = yup.object().shape({
    email,
});