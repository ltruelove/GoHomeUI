import React, {useEffect, useState} from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { NodeVM } from "../../Models/NodeVM";
// @ts-ignore
import NodeData from "../../Components/Node/NodeData.tsx";

const defaultNodeRecord: NodeVM = {
    Id: 0,
    Name: "",
    Mac: "",
    IpAddress: "",
    controlPointId: 0,
    controlPointIp: "",
    controlPointName: "",
    sensors: [],
    switches: []
}

export default function Node(){
    let { id } = useParams();
    let idVar = id ? parseInt(id) : 0;
    const [record, setRecord] = useState<NodeVM>({...defaultNodeRecord, Id: idVar});

    const getNodeRecord = () => {
        axios.get(process.env.REACT_APP_API_URL + '/node/' + id)
        .then(res=>{
            if(!res.data.sensors){
                res.data.sensors = [];
            }
            if(!res.data.switches){
                res.data.switches = [];
            }
            setRecord(res.data);
        })
        .catch(err=>console.log(err))
    }

    useEffect(() => {
        getNodeRecord();
    }, []);

    return (
        <div className="App">
        <NodeData record={record} refreshNode={getNodeRecord} />
        </div>
    )
}