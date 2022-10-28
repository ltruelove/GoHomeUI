import React from 'react';
import {Route, Routes, BrowserRouter} from "react-router-dom";
// @ts-ignore
import Home from './Pages/Home.tsx';
// @ts-ignore
import ControlPoints from './Pages/ControlPoint/ControlPoints.tsx';
// @ts-ignore
import ControlPoint from './Pages/ControlPoint/ControlPoint.tsx';
// @ts-ignore
import Nodes from './Pages/Node/Nodes.tsx';
// @ts-ignore
import Node from './Pages/Node/Node.tsx';
// @ts-ignore
import Nav from './Nav.tsx';
// @ts-ignore
import Views from './Pages/View/Views.tsx';
// @ts-ignore
import CreateView from './Pages/View/CreateView.tsx';
// @ts-ignore
import EditView from './Pages/View/EditView.tsx';
// @ts-ignore
import ViewDetail from './Pages/View/ViewDetail.tsx';

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
              <Route path="/" element={<Home />} />
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