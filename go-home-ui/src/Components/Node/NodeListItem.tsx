import React, {useState} from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { ControlPoint } from "../../Models/ControlPoint";
import { NodeData } from "../../Models/NodeData";

interface NodeListItemProps {
    Id: number,
    Name: string,
    record: ControlPoint
}

const defaultDetails: NodeData = {
    Humidity: 0,
    Moisture: 0,
    TemperatureF: 0,
    TemperatureC: 0,
    IsClosed: false,
    ResistorValue: 0,
    nodeId: 0
}

export default function NodeListItem(props: NodeListItemProps){
    const [details, setDetails] = useState<NodeData>(defaultDetails);
    const [showDetails, setShowDetails] = useState(false);
    const id = props.Id;
    const name = props.Name;
    const record = props.record;

    const getNodeData = () =>{ 
        axios.get('http://' + record.IpAddress + '/nodeData?nodeId=' + id)
        .then(res=>{
            if(res.data){
                setShowDetails(true);
                setDetails(res.data);
            }
        })
        .catch(err=>console.log(err))
    }

        return (
            <>
                <Link className="App-link" to={`/node/${id}`}>{name}</Link> - <Link to={''} onClick={() => getNodeData()} className="App-link">Details</Link>
                {showDetails ?
                <div>
                    <p>Humidity: {details.Humidity}</p>
                    <p>Moisture: {details.Moisture}</p>
                    <p>Temperature F: {details.TemperatureF}</p>
                    <p>Termperature C: {details.TemperatureC}</p>
                    <p>Toggle Is Closed: {details.IsClosed ? "Yes" : "No"}</p>
                    <p>Resistor Value: {details.ResistorValue}</p>
                </div>
                : ""
                }
            </>
            )
}