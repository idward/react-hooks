import React from 'react';
import { render } from 'react-dom';
import LoginForm from './components/form-validation';

declare let module: any;

render(<LoginForm />, document.getElementById('root'));

if (module.hot) {
  module.hot.accept();
}
