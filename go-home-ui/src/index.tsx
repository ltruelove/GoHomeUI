import React from 'react';
import axios from "axios";
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

let res = await axios.get(process.env.REACT_APP_IP_URL!)
const apiUrl = 'http://' + res.data + ':8082';
export default apiUrl;

const root = ReactDOM.createRoot(rootElement);
root.render(
<App />
);
