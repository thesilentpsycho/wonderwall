import React from 'react'
import { render } from 'react-dom'
import { MyRoute } from './routes/route'
import registerServiceWorker from './registerServiceWorker';

window.React = React

render(<MyRoute />, document.getElementById('root'));
registerServiceWorker();
