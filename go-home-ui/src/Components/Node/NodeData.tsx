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

const defaultNodeData: NodeDataModel = {
    Humidity: 0,
    Moisture: 0,
    TemperatureF: 0,
    TemperatureC: 0,
    IsClosed: false,
    ResistorValue: 0,
    nodeId: 0
};

interface NodeDataProps {
    id: number
}

export default function NodeData(props: NodeDataProps){
    const navigate = useNavigate();
    const [record, setRecord] = useState<NodeVM>({...defaultNodeRecord, Id: props.id});
    const [data, setData] = useState<NodeDataModel>(defaultNodeData);
    const [pin, setPin] = useState("");

    const pinChanged = (event: React.ChangeEvent<HTMLInputElement>) =>{
        setPin(event.target.value);
    }

    const getNodeData = (node: NodeVM) => {
        axios.get('http://' + node.controlPointIp + '/triggerUpdate?mac=' + node.Mac)
        .then(res=>{
            // there needs to be a slight delay before fetching the updated data
            setTimeout(() => {
                axios.get('http://' + node.controlPointIp + '/nodeData?nodeId=' + node.Id)
                .then(res=>{
                    setData(res.data);
                })
                .catch(err=>console.log(err))
            }, 100);
        })
        .catch(err=>console.log(err))
    }

    const toggleButton = (switchId: number) => {
        const requestBody = JSON.stringify({"pinCode" : pin});
        const url = process.env.REACT_APP_API_URL + '/node/switch/toggle/' + switchId;

        axios.post(url, requestBody)
        .then(res=>{
            setData(res.data);
            getNodeData(record);
        })
        .catch(err=>alert(err.response.data))
    }

    const pressMomentary = (switchId: number) => {
        const requestBody = JSON.stringify({"pinCode" : pin});
        const url = process.env.REACT_APP_API_URL + '/node/switch/press/' + switchId;

        axios.post(url, requestBody)
        .then(res=>{
            setData(res.data);
            getNodeData(record);
        })
        .catch(err=>alert(err.response.data))
    }

    const deleteNode = (event: React.MouseEvent<HTMLButtonElement>) => {
        if(window.confirm("Are you sure you want to delete this node?")){
            axios.delete(process.env.REACT_APP_API_URL + '/node/' + record.Id + '/delete')
            .then(res=>{
                navigate("/nodes");
            })
            .catch(err=>console.log(err))
        }
    }

    const editNode =  (event: React.MouseEvent<HTMLButtonElement>) => {
        navigate("/node/edit/" + record.Id);
    }

    const displaySensorData = (sensor: NodeSensorVM) => {
        if(!data){
            return;
        }

        switch(sensor.SensorTypeId){
            case 1:
                return <TempHumidity key={sensor.Id} sensorName={sensor.Name} data={data} />
            case 2:
                return <p key={sensor.Id}>{sensor.Name}: {data.Moisture}</p>
            case 4:
                return <p key={sensor.Id}>{sensor.Name}: {data.ResistorValue}</p>
            default:
                return <p key={sensor.Id}>Invalid Input</p>
        }
    }

    const displaySwitchData = (nodeSwitch: NodeSwitchVM) => {
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
                return <p key={nodeSwitch.Id}>Invalid Input</p>
        }
    }

    useEffect(() => {
        axios.get(process.env.REACT_APP_API_URL + '/node/' + record.Id)
        .then(res=>{
            console.log(res.data);
            if(!res.data.sensors){
                res.data.sensors = [];
            }
            if(!res.data.switches){
                res.data.switches = [];
            }
            setRecord(res.data);
            getNodeData(res.data);
        })
        .catch(err=>console.log(err))
    }, []);

    return (
        <>
        <p>PIN: <input onChange={pinChanged} type="password" id="requestPIN" /></p>
        <h2>Node Details </h2>
        <p>Name: {record.Name}</p>
        <p>MAC Address: {record.Mac}</p>
        <button onClick={deleteNode}>Delete</button>
        <button onClick={() => getNodeData(record)}>Refresh</button>
        <button onClick={editNode}>Edit Name</button>
        <br />
        
        <h2>Node Sensors</h2>
        {record.sensors.map((sensor) => (
            displaySensorData(sensor)
        ))}

        <h2>Node Switches</h2>
        {record.switches.map((nodeSwitch) => (
            displaySwitchData(nodeSwitch)
        ))}
        </>
    )
}