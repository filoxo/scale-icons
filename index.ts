import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { Icon } from './src/Icon'

console.log('Icon', Icon)

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(React.createElement(Icon, { name: 'Building' }))