import React,{useEffect, useState} from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { ControlPoint } from "../../Models/ControlPoint";
// @ts-ignore
import apiUrl from "../../index.tsx";

export default function ControlPoints(){
    const [allPoints, setAllPoints] = useState<ControlPoint[]>([]);

    useEffect(() => {
        axios.get(apiUrl + '/controlPoint')
        .then(res=>{
            if(res.data){
                setAllPoints(res.data? res.data : []);
            }
        })
        .catch(err=>console.log(err))
    }, [""]);

    return (
        <>
        <h3>Control Points</h3>
        <ul>
            {allPoints.map((point) => (
                <li key={point.Id}>
                    <Link className="App-link" to={`/controlPoint/${point.Id}`}>{point.Name}</Link>
                </li>
            ))}
        </ul>
        </>
    )
}