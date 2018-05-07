import React from 'react';
import { render } from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
// import functions to retrieve entries as getEntries from '../functions';
// import functions to retrieve journals as getJournals from '../functions';

// getData().then(data => render(<App data={data}/>, document.getElementById('root'));)
render(<App />, document.getElementById('root'));
registerServiceWorker();
