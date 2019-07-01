import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './css/constants.scss';
import './css/button.scss';
import './css/advantageLink.scss';
import './css/opportunity.scss';

import './css/navbar.scss';
import './css/home.scss';
import './css/advantage.scss';
import './css/discover.scss';
import './css/testimonials.scss';
import './css/outtro.scss';
import './css/footer.scss';
import './css/discoverApp.scss';

import App from './app';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
