import { useState, useEffect, SyntheticEvent } from 'react';

interface ValidateFn {
  (values: any): any;
}

interface CallbackFn {
  (): any;
}

interface FormFields {
  email: string;
  password: string;
}

type ErrorFields = FormFields;

export const useForm = (callback: CallbackFn, validate: ValidateFn) => {
  const [values, setValues] = useState<Partial<FormFields>>({});
  const [errors, setErrors] = useState<Partial<ErrorFields>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      callback();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errors]);

  const handleSubmit = (event: SyntheticEvent<HTMLFormElement>) => {
    if (event) event.preventDefault();
    setErrors(validate(values));
    setIsSubmitting(true);
  };

  const handleChange = (event: SyntheticEvent<HTMLInputElement>) => {
    event.persist();
    setValues((v: any) => {
      debugger;

      return { ...v, [event.currentTarget.name]: event.currentTarget.value };
    });
  };

  return {
    handleChange,
    handleSubmit,
    values,
    errors,
  };
};
