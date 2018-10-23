import React from 'react';
import ReactDOM from 'react-dom';
import NewsBoard from './components/NewsBoard';
import { store } from './store';

const render = () => ReactDOM.render(<NewsBoard />, document.getElementById('app'));
render();
store.subscribe(render);