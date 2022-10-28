import React, {useState} from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function NodeListItem(props){
    const [details, setDetails] = useState({});
    const [showDetails, setShowDetails] = useState(false);
    const id = props.Id;
    const name = props.Name;
    const record = props.record;

    const getNodeData = (nodeId) =>{ 
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
                <Link className="App-link" to={`/node/${id}`}>{name}</Link> - <Link onClick={() => getNodeData(id)} className="App-link">Details</Link>
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