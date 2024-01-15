import React,{useEffect, useState} from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ReactModal from "react-modal";
// @ts-ignore
import NodeSensorList from "../../Components/Node/NodeSensorList.tsx";
// @ts-ignore
import NodeSwitchList from "../../Components/Node/NodeSwitchList.tsx";
// @ts-ignore
import apiUrl from "../../index.tsx";
import { ViewVM } from "../../Models/ViewVM";
import { NodeVM } from "../../Models/NodeVM";

const defaultViewData: ViewVM = {
    Id: 0,
    Name: "",
    sensors: [],
    switches: []
}

export default function EditView(){
    const navigate = useNavigate();
    const [view, setView] = useState<ViewVM>(defaultViewData);
    const [allNodes, setAllNodes] = useState<NodeVM[]>([]);
    const [showSensorModal, setShowSensorModal] = useState(false);
    const [showSwitchModal, setShowSwitchModal] = useState(false);

    let { id } = useParams();

    const sensorIsSelected = (sensorId: number) =>{
        let exists = false;
        view.sensors.forEach((sensor) => {
            if(sensor.NodeSensorId === sensorId){
                exists = true;
            }
        });

        return exists;
    }

    const switchIsSelected = (switchId: number) =>{
        let exists = false;
        view.switches.forEach((nodeSwitch, index) => {
            if(nodeSwitch.NodeSwitchId === switchId){
                exists = true;
            }
        });

        return exists;
    }
    
    const fetchAllNodes = () => {
        axios.get(apiUrl + '/node')
        .then(res=>{
            if(res.data){
                setAllNodes(res.data);
            }
        })
        .catch(err=>console.log(err))
    }

    const fetchViewData = () => {
        axios.get(apiUrl + '/view/' + id)
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

    const removeSelectedSensor = (sensorId: number) => {
        axios.delete(apiUrl + '/view/node/sensor/' + sensorId)
        .then(res=>{
            fetchViewData();
        })
        .catch(err=>alert(err.response.data))
    }

    const removeSelectedSwitch = (switchId: number) => {
        axios.delete(apiUrl + '/view/node/switch/' + switchId)
        .then(res=>{
            fetchViewData();
        })
        .catch(err=>alert(err.response.data))
    }

    const saveClicked = () => {
        let thisView = {
            Id: view.Id,
            Name: view.Name
        }

        axios.put(apiUrl + '/view', thisView)
        .then(res=>{
            fetchViewData();
        })
        .catch(err=>alert(err.response.data))
    }

    const cancelClicked = () => {
        navigate('/view/' + id);
    }

    useEffect(() => {
        fetchViewData();
        fetchAllNodes();
    }, []);

    return (
        <>
        <h2>Edit View</h2>
        <p>Name <input
            type="text"
            value={view.Name}
            onChange={event => setView({...view, Name: event.target.value})}
        /></p>
        <button onClick={cancelClicked}>Cancel</button>
        <button onClick={saveClicked}>Save</button>
        <br />
        <br />
        <h2>Sensors</h2>
        <button onClick={() => {setShowSensorModal(true);}}>Add A Sensor</button>
        <br />
        <br />
        {view.sensors.map((sensor) => {
            return (
                <div key={sensor.Id}>{sensor.Name} <button onClick={() => {removeSelectedSensor(sensor.Id)}}>Remove</button></div>
            )
        })}
        <ReactModal isOpen={showSensorModal} onAfterClose={fetchViewData} ariaHideApp={false}>
            <h2>Nodes ({allNodes.length})</h2>
            <ul>
            {allNodes.map(node => {
                return (
                    <NodeSensorList key={node.Id} node={node} viewId={id} sensorIsSelected={sensorIsSelected} />
                )
            })}
            </ul>
            <button onClick={() => {setShowSensorModal(false);}}>Close</button>
        </ReactModal>

        <h2>Switches</h2>
        <button onClick={() => {setShowSwitchModal(true);}}>Add A Switch</button>
        <br />
        <br />
        {view.switches.map((nodeSwitch) => (
            <div key={nodeSwitch.Id}>{nodeSwitch.Name} <button onClick={() => {removeSelectedSwitch(nodeSwitch.Id)}}>Remove</button></div>
        ))}

        <ReactModal isOpen={showSwitchModal} onAfterClose={fetchViewData} ariaHideApp={false}>
            <h2>Nodes ({allNodes.length})</h2>
            <ul>
            {allNodes.map(node => {
                return (
                    <NodeSwitchList key={node.Id} node={node} viewId={id} switchIsSelected={switchIsSelected} />
                )
            })}
            </ul>
            <button onClick={() => {setShowSwitchModal(false);}}>Close</button>
        </ReactModal>
        </>
    )
}