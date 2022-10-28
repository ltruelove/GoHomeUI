import React from 'react';
import {Route, Routes, BrowserRouter} from "react-router-dom";
import Home from './Home';
import ControlPoints from './ControlPoints';
import ControlPoint from './ControlPoint';
import Nodes from './Nodes';
import Node from './Node';
import Nav from './Nav';
import Views from './Views';
import CreateView from './CreateView';
import EditView from './EditView';
import ViewDetail from './ViewDetail';

export default function App(){
  return (
    <div className="GoHomeUIApp">
      <BrowserRouter>
        <div style={{ display: "flex" }}>
          <div
            style={{
              padding: "10px",
              width: "10%",
              background: "#f0f0f0"
            }}
          >
            <Nav />
          </div>
          <div style={{ flex: 1, padding: "10px" }}>
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route path="controlPoints" element={<ControlPoints />} />
              <Route path="controlPoint/:id" element={<ControlPoint />} />
              <Route path="nodes" element={<Nodes />} />
              <Route path="node/:id" element={<Node />} />
              <Route path="views" element={<Views />} />
              <Route path="view/create" element={<CreateView />} />
              <Route path="view/:id" element={<ViewDetail />} />
              <Route path="view/edit/:id" element={<EditView />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </div>
  )
}