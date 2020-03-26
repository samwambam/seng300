import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

/*renders App component using the root from index.html*/
ReactDOM.render(<App />, document.getElementById('root')); 
registerServiceWorker();
