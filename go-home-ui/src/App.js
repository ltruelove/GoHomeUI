import React from 'react';
import {Route, Routes, BrowserRouter} from "react-router-dom";
import Home from './Home';
import ControlPoints from './ControlPoints';
import ControlPoint from './ControlPoint';
import Nodes from './Nodes';
import Node from './Node';

export default function App(){
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="controlPoints" element={<ControlPoints />} />
        <Route path="controlPoint/:id" element={<ControlPoint />} />
        <Route path="nodes" element={<Nodes />} />
        <Route path="node/:id" element={<Node />} />
      </Routes>
    </BrowserRouter>
  )
}