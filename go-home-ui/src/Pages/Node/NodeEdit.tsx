import React from "react";
import { useParams } from "react-router-dom";
// @ts-ignore
import NodeDataEdit from "../../Components/Node/NodeDataEdit.tsx";

export default function NodeEdit(){
    let { id } = useParams();

    return (
        <>
        <NodeDataEdit id={id} />
        </>
    )
}