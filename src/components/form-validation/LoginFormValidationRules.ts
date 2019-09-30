interface Errors {
  [key: string]: any;
}

const validate = (values: any) => {
  const errors: Partial<Errors> = {};

  if (!values.email) {
    errors.email = 'Email address is required';
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = 'Email address is invalid';
  }

  if (!values.password) {
    errors.password = 'Password is required';
  } else if (values.password.length < 6 || values.password.length > 10) {
    errors.password = 'Password must between 6 and 10';
  }

  return errors;
};

export default validate;
