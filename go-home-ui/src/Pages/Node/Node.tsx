import React from "react";
import { useParams } from "react-router-dom";
// @ts-ignore
import NodeData from "../../Components/Node/NodeData.tsx";

export default function Node(){
    let { id } = useParams();
    let idVar = id ? parseInt(id) : 0;

    // This page is mostly just a placeholder for the NodeData component now
    return (
        <div className="App">
        <NodeData Id={ idVar } />
        </div>
    )
}