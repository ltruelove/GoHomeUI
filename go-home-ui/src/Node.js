import React from "react";
import { useParams } from "react-router-dom";
import NodeData from "./NodeData";

export default function ControlPoints(){
    let { id } = useParams();

    return (
        <>
        <h3>Node for ID: {id}</h3>
        <NodeData id={id} />
        </>
    )
}