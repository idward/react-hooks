import React from 'react';
import { render } from 'react-dom';
import HackNews from './components/hackNews';

declare let module: any;

render(<HackNews />, document.getElementById('root'));

if (module.hot) {
  module.hot.accept();
}
