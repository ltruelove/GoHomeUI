import React, {useEffect, useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import NodeListItem from "../Node/NodeListItem";

export default function ControlPointData(props){
    const navigate = useNavigate();
    const recordId = props.id;
    const [record, setRecord] = useState({});
    const [allNodes, setAllNodes] = useState([]);

    const deleteControlPoint = (event) => {
        const id = event.target.id;

        if(window.confirm("Are you sure you want to delete this control point?")){
            axios.delete(process.env.REACT_APP_API_URL + '/controlPoint/' + id + '/delete')
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
                    <NodeListItem Id={node.Id} Name={node.Name} record={record} details={node.details} />
                </li>
            ))}
        </ul>
        </>
    )
}