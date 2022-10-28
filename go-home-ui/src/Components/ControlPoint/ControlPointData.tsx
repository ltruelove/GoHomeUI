import React, {useEffect, useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// @ts-ignore
import NodeListItem from "../Node/NodeListItem.tsx";
import { ControlPoint } from "../../Models/ControlPoint";
import { ControlPointNode } from "../../Models/ControlPointNode";

interface ControlPointDataProps {
    id: Number
}

const defaultControlPoint: ControlPoint = {
    Id: 0,
    Name: "",
    IpAddress: "",
    Mac: ""
}

export default function ControlPointData(props: ControlPointDataProps){
    const navigate = useNavigate();
    const recordId = props.id;
    const [record, setRecord] = useState<ControlPoint>(defaultControlPoint);
    const [allNodes, setAllNodes] = useState<ControlPointNode[]>([]);

    const deleteControlPoint = (event: React.MouseEvent<HTMLButtonElement>) => {
        if(window.confirm("Are you sure you want to delete this control point?")){
            axios.delete(process.env.REACT_APP_API_URL + '/controlPoint/' + recordId + '/delete')
            .then(res=>{
                navigate("/controlPoints");
            })
            .catch(err=>console.log(err))
        }
    }

    const getControlPointData = () => {
        axios.get(process.env.REACT_APP_API_URL + '/controlPoint/' + recordId)
        .then(res=>{
            setRecord(res.data);
        })
        .catch(err=>console.log(err))
    }

    const getAllNodes = () => {
        axios.get(process.env.REACT_APP_API_URL + '/controlPoint/nodes/' + recordId)
        .then(res=>{
            if(res.data){
                setAllNodes(res.data);
            }
        })
        .catch(err=>console.log(err))
    }

    useEffect(() => {
        getControlPointData();
        getAllNodes();
    }, []);

    return (
        <>
        <p>Name: {record.Name}</p>
        <p>IP Address: {record.IpAddress}</p>
        <p>MAC Address: {record.Mac}</p>
        <button onClick={deleteControlPoint}>Delete</button>
        <h3>Nodes</h3>
        <ul>
            {allNodes.map((node) => (
                <li key={node.Id}>
                    <NodeListItem Id={node.Id} Name={node.Name} record={record} />
                </li>
            ))}
        </ul>
        </>
    )
}