import React from "react";
import { useParams } from "react-router-dom";
// @ts-ignore
import ControlPointData from "../../Components/ControlPoint/ControlPointData.tsx";

export default function ControlPoints(){
    let { id } = useParams();

    return (
        <>
        <h3>Control Point for ID: {id}</h3>
        <ControlPointData id={id} />
        </>
    )
}