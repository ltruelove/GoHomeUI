import React, {useEffect, useState} from "react";
import axios from "axios";
import TempHumidity from "./TempHumidity";
import { useNavigate } from "react-router-dom";

export default function NodeData(props){
    const navigate = useNavigate();
    const recordId = props.id;
    const [record, setRecord] = useState({});
    const [data, setData] = useState();
    const [allSensors, setAllSensors] = useState([]);
    const [allSwitches, setAllSwitches] = useState([]);
    const [pin, setPin] = useState("");

    const pinChanged = (event) =>{
        setPin(event.target.value);
    }

    const getNodeData = (mac) => {
        axios.get('http://' + record.controlPointIp + '/triggerUpdate?mac=' + mac)
        .then(res=>{
            axios.get('http://' + record.controlPointIp + '/nodeData?nodeId=' + recordId)
            .then(res=>{
                setData(res.data);
            })
            .catch(err=>console.log(err))
        })
        .catch(err=>console.log(err))
    }

    const toggleButton = (switchId) => {
        const requestBody = JSON.stringify({"pinCode" : pin});
        const url = process.env.REACT_APP_API_URL + '/node/switch/toggle/' + switchId;
        let mac = record.Mac;

        axios.post(url, requestBody)
        .then(res=>{
            setData(res.data);
            getNodeData(mac);
        })
        .catch(err=>alert(err.response.data))
    }

    const pressMomentary = (switchId) => {
        const requestBody = JSON.stringify({"pinCode" : pin});
        const url = process.env.REACT_APP_API_URL + '/node/switch/press/' + switchId;
        let mac = record.Mac;

        axios.post(url, requestBody)
        .then(res=>{
            setData(res.data);
            getNodeData(mac);
        })
        .catch(err=>alert(err.response.data))
    }

    const deleteNode = (event) => {
        const id = event.target.id;

        if(window.confirm("Are you sure you want to delete this node?")){
            axios.delete(process.env.REACT_APP_API_URL + '/node/' + id + '/delete')
            .then(res=>{
                console.log(res);
                navigate("/nodes");
            })
            .catch(err=>console.log(err))
        }
    }

    const displaySensorData = (sensor) => {
        if(!data){
            return;
        }

        switch(sensor.SensorTypeId){
            case 1:
                return <TempHumidity key={sensor.Id} sensorName={sensor.Name} data={data} />
            case 2:
                return <p key={sensor.Id}>{sensor.Name}: {data.Moisture}</p>
            case 3:
                return <p key={sensor.Id}>{sensor.Name}: {data.Magnetic}</p>
            case 4:
                return <p key={sensor.Id}>{sensor.Name}: {data.ResistorValue}</p>
            default:
                return <p div key={sensor.Id}>Invalid Input</p>
        }
    }

    const displaySwitchData = (nodeSwitch) => {
        if(!data){
            return;
        }

        switch(nodeSwitch.SwitchTypeId){
            case 1:
                return <div key={nodeSwitch.Id}>
                    <button onClick={() => pressMomentary(nodeSwitch.Id)}>Press {nodeSwitch.Name} Switch</button>
                    &nbsp; for {nodeSwitch.MomentaryPressDuration} milliseconds
                </div>
            case 2:
                return <div key={nodeSwitch.Id}>
                    <button onClick={() => toggleButton(nodeSwitch.Id)}>Toggle {nodeSwitch.Name} Switch</button>
                    &nbsp; (Circuit is {data.IsClosed ? "closed":"open"})
                </div>
            default:
                return <p div key={nodeSwitch.Id}>Invalid Input</p>
        }
    }

    useEffect(() => {
        axios.get(process.env.REACT_APP_API_URL + '/node/' + recordId)
        .then(res=>{
            setRecord(res.data);
            setAllSensors(res.data.sensors ? res.data.sensors : [])
            setAllSwitches(res.data.switches ? res.data.switches : [])
            getNodeData(res.data.Mac);
        })
        .catch(err=>console.log(err))
    }, [""]);

    return (
        <>
        <p>PIN: <input onChange={pinChanged} type="password" id="requestPIN" /></p>
        <h2>Node Details</h2>
        <p>Name: {record.Name}</p>
        <p>IP Address: {record.IpAddress}</p>
        <p>MAC Address: {record.Mac}</p>
        <button id={recordId} onClick={deleteNode}>Delete</button>
        <button onClick={() => getNodeData(record.Mac)}>Refresh</button>
        <br />
        
        <h2>Node Sensors</h2>
        {allSensors.map((sensor) => (
            displaySensorData(sensor)
        ))}

        <h2>Node Switches</h2>
        {allSwitches.map((nodeSwitch) => (
            displaySwitchData(nodeSwitch)
        ))}
        </>
    )
}