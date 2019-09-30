import React, { FC } from 'react';
import { useForm } from './hooks';
import validate from './LoginFormValidationRules';
import styles from '../../index.css';

interface IFormProps {
  [key: string]: any;
}

const login = () => {
  console.log('Login successfully');
};

const Form: FC<IFormProps> = () => {
  const { handleChange, handleSubmit, values, errors } = useForm(login, validate);

  return (
    <div id={styles['form-container']}>
      <h2>Login</h2>
      <hr />
      <form onSubmit={handleSubmit}>
        <div className={styles.control}>
          <input type="email" name="email" onChange={handleChange} value={values.email || ''} />
          {errors.email && (
            <p className={[styles['is-help'], styles['is-danger']].join(' ')}>{errors.email}</p>
          )}
        </div>
        <div className={styles.control}>
          <input
            type="password"
            name="password"
            onChange={handleChange}
            value={values.password || ''}
          />
          {errors.password && (
            <p className={[styles['is-help'], styles['is-danger']].join(' ')}>{errors.password}</p>
          )}
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Form;
