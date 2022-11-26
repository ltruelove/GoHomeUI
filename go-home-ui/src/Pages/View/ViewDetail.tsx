import React,{useEffect, useState} from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { ViewVM } from "../../Models/ViewVM";
// @ts-ignore
import { ViewSwitch } from "./ViewSwitch.tsx";
// @ts-ignore
import { ViewSensor } from "./ViewSensor.tsx";
import { NodeVM } from "../../Models/NodeVM";
import { NodeSensorVM } from "../../Models/NodeSensorVM";

const defaultViewData: ViewVM = {
    Id: 0,
    Name: "",
    sensors: [],
    switches: [],
}

export default function ViewDetail(){
    const [view, setView] = useState<ViewVM>(defaultViewData);
    const [pin, setPin] = useState("");
    const [nodes, setNodes] = useState<NodeVM[]>([]);
    const [nodeIdList, setNodeIdList] = useState<number[]>([]);
    const [showSensors, setShowSensors] = useState(false);

    let { id } = useParams();

    const pinChanged = (event: React.ChangeEvent<HTMLInputElement>) =>{
        setPin(event.target.value);
    }
    
    const fetchViewData = () => {
        axios.get(process.env.REACT_APP_API_URL + '/view/' + id)
        .then(res=>{
            if(res.data){

                if(res.data.sensors === null){
                    res.data.sensors = [];
                }
                if(res.data.switches === null){
                    res.data.switches = [];
                }

                setView(res.data);
            }
        })
        .catch(err=>console.log(err))
    }

    const getNode = (nodeId:number) =>{
        let exists = false;

        nodes.forEach((node) => {
            if(node.Id === nodeId){
                exists = true;
            }
        })
        
        if(exists){
            return;
        }

        axios.get(process.env.REACT_APP_API_URL + '/node/' + nodeId)
        .then(res=>{
            let node:NodeVM = res.data;
            let currentNodes = nodes;

            currentNodes.push(node);
            setNodes(nodes);

            if(nodeIdList.length === nodes.length){
                setShowSensors(true);
            }
        })
        .catch(err=>console.log(err))
    }

    const getSensorNode = (sensor:NodeSensorVM, nodes:NodeVM[]) => {
        let foundNode = {};
        nodes.forEach((node) => {
            if(node.Id === sensor.NodeId){
                foundNode = node;
            }
        })

        return foundNode;
    }

    const fetchUsedNodes = () => {
        let nodeIds:number[] = [];

        view.sensors.forEach((sensor) => {
            if(!nodeIds.includes(sensor.NodeId)){
                nodeIds.push(sensor.NodeId);
            }
        })

        view.switches.forEach((nodeSwitch) => {
            if(!nodeIds.includes(nodeSwitch.NodeId)){
                nodeIds.push(nodeSwitch.NodeId);
            }
        })

        setNodeIdList(nodeIds);
    }

    useEffect(() => {
        fetchViewData();
    }, []);

    useEffect(() => {
        if(nodes.length < 1){
            fetchUsedNodes()
        }
    }, [view]);

    useEffect(() => {
        nodeIdList.forEach((id) => {
            getNode(id);
        });
    }, [nodeIdList])

    return (
        <>
            <h2>{view.Name}</h2>
            <br />
            <Link className="App-link" to={`/view/edit/${id}`}>Edit</Link>
            <br />
            { showSensors && view.sensors.length > 0 ? 
            <>
            <h2>Sensors</h2>
            <br />
            <br />
            {view.sensors.map((sensor) => {
                return (
                    <ViewSensor key={sensor.Id} nodeSensor={sensor} node={getSensorNode(sensor,nodes)} />
                )
            })}
            </> : "" }

            {view.switches.length > 0 ? 
            <>
            <h2>Switches</h2>
            <p>PIN: <input onChange={pinChanged} type="password" id="requestPIN" /></p>
            <br />
            <br />
            {view.switches.map((nodeSwitch) => (
                <ViewSwitch key={nodeSwitch.Id} nodeSwitch={nodeSwitch} pin={pin} />
            ))}
            </> : ""}
        </>
    )
}