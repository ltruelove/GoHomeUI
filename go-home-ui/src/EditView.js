import React,{useEffect, useState} from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import ReactModal from "react-modal";
import NodeSensorList from "./NodeSensorList";
import NodeSwitchList from "./NodeSwitchList";

export default function EditView(){
    const [name, setName] = useState('');
    const [switches, setSwitches] = useState([]);
    const [sensors, setSensors] = useState([]);
    const [allNodes, setAllNodes] = useState([]);
    const [showSensorModal, setShowSensorModal] = useState(false);
    const [showSwitchModal, setShowSwitchModal] = useState(false);

    let { id } = useParams();

    const sensorIsSelected = sensorId =>{
        let exists = false;
        sensors.forEach((sensor) => {
            if(sensor.NodeSensorId === sensorId){
                exists = true;
            }
        });

        return exists;
    }

    const switchIsSelected = switchId =>{
        let exists = false;
        switches.forEach((nodeSwitch, index) => {
            if(nodeSwitch.NodeSwitchId === switchId){
                exists = true;
            }
        });

        return exists;
    }
    
    const fetchAllNodes = () => {
        axios.get(process.env.REACT_APP_API_URL + '/node')
        .then(res=>{
            if(res.data){
                setAllNodes(res.data);
            }
        })
        .catch(err=>console.log(err))
    }

    const fetchViewData = () => {
        axios.get(process.env.REACT_APP_API_URL + '/view/' + id)
        .then(res=>{
            console.log(res.data);
            if(res.data && res.data.Name){
                setName(res.data.Name);

                if(res.data.sensors){
                    setSensors(res.data.sensors);
                }else{
                    setSensors([]);
                }

                if(res.data.switches){
                    setSwitches(res.data.switches);
                }else{
                    setSwitches([]);
                }
            }
        })
        .catch(err=>console.log(err))
    }

    const removeSelectedSensor = sensorId => {
        axios.delete(process.env.REACT_APP_API_URL + '/view/node/sensor/' + sensorId)
        .then(res=>{
            fetchViewData();
        })
        .catch(err=>alert(err.response.data))
    }

    const removeSelectedSwitch = switchId => {
        axios.delete(process.env.REACT_APP_API_URL + '/view/node/switch/' + switchId)
        .then(res=>{
            fetchViewData();
        })
        .catch(err=>alert(err.response.data))
    }

    const saveClicked = () => {
        let thisView = {
            Id: parseInt(id),
            Name: name
        }

        axios.put(process.env.REACT_APP_API_URL + '/view', thisView)
        .then(res=>{
            console.log(res);
            fetchViewData();
        })
        .catch(err=>alert(err.response.data))
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
            value={name}
            onChange={event => setName(event.target.value)}
        /></p>
        <button onClick={saveClicked}>Save</button>
        <br />
        <br />
        <h2>Sensors</h2>
        <button onClick={() => {setShowSensorModal(true);}}>Add A Sensor</button>
        <br />
        <br />
        {sensors.map((sensor) => {
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
        {switches.map((nodeSwitch) => (
            <div>{nodeSwitch.Name} <button onClick={() => {removeSelectedSwitch(nodeSwitch.Id)}}>Remove</button></div>
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