const testUser = {
  firstName: 'test',
  lastName: 'test',
  email: '@fa_eng.com',
  password: 'validPassword@1',
  confirmPassword: 'validPassword@1',
  phoneNumber: '1234567890',
};

const jestTestUser = {
  firstName: 'firstName',
  lastName: 'lastName',
  email: 'test@testing.com',
  password: 'validPassword@1',
  confirmPassword: 'validPassword@1',
  phoneNumber: '1234567890',
};

const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

export { testUser, apiUrl, jestTestUser };
