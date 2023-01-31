import React, {useEffect, useState} from "react";
import axios from "axios";
// @ts-ignore
import TempHumidity from "../View/TempHumidity.tsx";
import { useNavigate } from "react-router-dom";
import { NodeVM } from "../../Models/NodeVM";
import { NodeDataModel } from "../../Models/NodeDataModel";
import { NodeSensorVM } from "../../Models/NodeSensorVM";
import { NodeSwitchVM } from "../../Models/NodeSwitchVM";

const defaultNodeRecord: NodeVM = {
    Id: 0,
    Name: "",
    Mac: "",
    controlPointId: 0,
    controlPointIp: "",
    controlPointName: "",
    sensors: [],
    switches: []
}

interface NodeDataProps {
    id: number
}

export default function NodeDataEdit(props: NodeDataProps){
    const navigate = useNavigate();
    const [record, setRecord] = useState<NodeVM>({...defaultNodeRecord, Id: props.id});

    const nameChanged = (event: React.ChangeEvent<HTMLInputElement>) =>{
        setRecord({...record, Name: event.target.value})
    }

    const deleteNode = (event: React.MouseEvent<HTMLButtonElement>) => {
        if(window.confirm("Are you sure you want to delete this node?")){
            axios.delete(process.env.REACT_APP_API_URL + '/node/' + record.Id + '/delete')
            .then(res=>{
                console.log(res);
                navigate("/nodes");
            })
            .catch(err=>console.log(err))
        }
    }
    const saveChanges = (event: React.MouseEvent<HTMLButtonElement>) => {
        axios.put(process.env.REACT_APP_API_URL + '/node', record)
        .then(res=>{
            console.log(res);
            navigate("/node/" + record.Id);
        })
        .catch(err=>console.log(err))
    }

    useEffect(() => {
        axios.get(process.env.REACT_APP_API_URL + '/node/' + record.Id)
        .then(res=>{
            setRecord(res.data);
        })
        .catch(err=>console.log(err))
    }, []);

    return (
        <>
        <h2>Node</h2>
        <p>Name: <input onChange={nameChanged} type="text" value={record.Name} /></p>
        <p>MAC Address: {record.Mac}</p>
        <button onClick={deleteNode}>Delete</button>
        <button onClick={saveChanges}>Save</button>
        <br />
        </>
    )
}