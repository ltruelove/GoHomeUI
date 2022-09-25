import React from "react";
import { useParams } from "react-router-dom";
import ControlPointData from "./ControlPointData";

export default function ControlPoints(){
    let { id } = useParams();

    return (
        <>
        <h3>Control Point for ID: {id}</h3>
        <ControlPointData id={id} />
        </>
    )
}