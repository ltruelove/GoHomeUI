import React,{useEffect, useState} from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { NodeVM } from "../../Models/NodeVM"

export default function Nodes(props){
    const [allNodes, setAllNodes] = useState<NodeVM[]>([]);

    useEffect(() => {
        axios.get(process.env.REACT_APP_API_URL + '/node')
        .then(res=>{
            if(res.data){
                setAllNodes(res.data? res.data : []);
            }
        })
        .catch(err=>console.log(err))
    }, [""]);

    return (
        <>
        <h2>Nodes</h2>
        <ul>
            {allNodes.map((node) => (
                <li key={node.Id}>
                    <Link className="App-link" to={`/node/${node.Id}`}>{node.Name}</Link>
                </li>
            ))}
        </ul>
        </>
    )
}