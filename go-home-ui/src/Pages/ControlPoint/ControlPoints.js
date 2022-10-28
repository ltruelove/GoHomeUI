import React,{useEffect, useState} from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function ControlPoints(props){
    const [allPoints, setAllPoints] = useState([]);

    useEffect(() => {
        axios.get(process.env.REACT_APP_API_URL + '/controlPoint')
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