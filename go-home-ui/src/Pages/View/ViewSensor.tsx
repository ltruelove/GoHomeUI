import React,{useEffect, useState} from "react";
import axios from "axios";
import { NodeSensorVM } from "../../Models/NodeSensorVM";
import { NodeVM } from "../../Models/NodeVM";
import { NodeDataModel } from "../../Models/NodeDataModel";
// @ts-ignore
import TempHumidity from "../../Components/View/TempHumidity.tsx";

interface SensorData {
    nodeSensor: NodeSensorVM,
    node: NodeVM
}

const defaultNodeData: NodeDataModel = {
    Humidity: 0,
    Moisture: 0,
    TemperatureF: 0,
    TemperatureC: 0,
    IsClosed: false,
    ResistorValue: 0,
    MagneticValue: 0,
    nodeId: 0
};

export function ViewSensor(props:SensorData){
    const nodeSensor = props.nodeSensor;
    const node = props.node;
    const [nodeData, setData] = useState<NodeDataModel>(defaultNodeData)

    const getNodeData = (node: NodeVM) => {
        axios.post(process.env.REACT_APP_API_URL + '/node/update/' + node.Id)
        .then(res=>{
            axios.get(process.env.REACT_APP_API_URL + '/node/data/' + node.Id)
            .then(res=>{
                setData(res.data);
            })
            .catch(err=>console.log(err))
        })
        .catch(err=>console.log(err))
    }

    const displayData = () => {
        console.log(nodeSensor.SensorTypeName);
        switch(nodeSensor.SensorTypeName){
            case "DHT":
                return(
                    <>
                    <TempHumidity key={nodeSensor.Id} sensorName={nodeSensor.Name} data={nodeData} />
                    <br/>
                    </>
                )
            case "Moisture":
                return(
                    <p>Moisture Level: {nodeData.Moisture}</p>
                )
            case "Magnetic":
                return(
                    <p>Is Closed?: {nodeData.IsClosed ? "Yes" : "No"}</p>
                )
            case "Photoresistor":
                return(
                    <p>Resistor Value: {nodeData.ResistorValue}</p>
                )
            default:
                return(
                    <p>no data found</p>
                )
        }
    }

    useEffect(() => {
        getNodeData(node);
    }, []);

    return (
        <div>{displayData()}</div>
    )
}