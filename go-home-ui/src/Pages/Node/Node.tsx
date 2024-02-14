import React,{useEffect} from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
// @ts-ignore
import NodeData from "../../Components/Node/NodeData.tsx";
// @ts-ignore
import apiUrl from "../../index.tsx";

export default function Node(){
    let { id } = useParams();
    let idVar = id ? parseInt(id) : 0;

    const getNodeRecord = () => {
        axios.get(apiUrl + '/node/' + id)
        .then(res=>{
            if(!res.data.sensors){
                res.data.sensors = [];
            }
            if(!res.data.switches){
                res.data.switches = [];
            }
        })
        .catch(err=>console.log(err))
    }

    useEffect(() => {
        getNodeRecord();
    }, []);

    return (
        <div className="App">
        <NodeData Id={ idVar } />
        </div>
    )
}