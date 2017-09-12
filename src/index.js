import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
// import Demo from './Demo';
import registerServiceWorker from './registerServiceWorker';

import './style/components/index.styl';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
