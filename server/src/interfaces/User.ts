interface ICreateUser {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
}

interface IUser extends ICreateUser {
  id: string | number;
}

interface ILogin {
  email: string;
  password: string;
}

export { ICreateUser, ILogin, IUser };
