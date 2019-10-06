import React from 'react';
import { render } from 'react-dom';
import HighOrder from './components/hoc';

declare let module: any;

render(<HighOrder />, document.getElementById('root'));

if (module.hot) {
  module.hot.accept();
}
