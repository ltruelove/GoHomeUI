import React from "react";
import { useParams } from "react-router-dom";
// @ts-ignore
import NodeData from "../../Components/Node/NodeData.tsx";

export default function Node(){
    let { id } = useParams();

    return (
        <>
        <NodeData id={id} />
        </>
    )
}