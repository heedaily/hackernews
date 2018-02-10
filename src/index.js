import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
// leanpub-start-insert
if (module.hot) {
  module.hot.accept();
}
// leanpub-end-insert
registerServiceWorker();
