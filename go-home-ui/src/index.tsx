import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
// @ts-ignore
import App from './App.tsx';

const rootElement = document.getElementById('root');
if(!rootElement){
    throw new Error("Could not find the root element");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
<App />
);
