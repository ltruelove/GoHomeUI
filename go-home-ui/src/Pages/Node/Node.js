import React from "react";
import { useParams } from "react-router-dom";
import NodeData from "../../Components/Node/NodeData";

export default function ControlPoints(){
    let { id } = useParams();

    return (
        <>
        <NodeData id={id} />
        </>
    )
}