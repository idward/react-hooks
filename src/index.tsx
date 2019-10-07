import React from 'react';
import { render } from 'react-dom';
import DragList from './components/dragger-list';

declare let module: any;

render(<DragList />, document.getElementById('root'));

if (module.hot) {
  module.hot.accept();
}
