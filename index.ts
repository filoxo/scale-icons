import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { Icon } from './src/Icon'

console.log('Icon', Icon)

ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
    .render(React.createElement(Icon, { name: 'Building' }))