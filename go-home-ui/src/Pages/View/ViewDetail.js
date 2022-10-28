import React,{useEffect, useState} from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

export default function ViewDetail(){
    const [name, setName] = useState('');
    const [switches, setSwitches] = useState([]);
    const [sensors, setSensors] = useState([]);

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

    const editClicked = () => {
        window.location = '/view/edit/' + id;
    }

    useEffect(() => {
        fetchViewData();
    }, []);

    return (
        <>
        <h2>{name}</h2>
        <br />
        <Link className="App-link" to={`/view/edit/${id}`}>Edit</Link>
        <br />
        <h2>Sensors</h2>
        <br />
        <br />
        {sensors.map((sensor) => {
            return (
                <div key={sensor.Id}>{sensor.Name}</div>
            )
        })}

        <h2>Switches</h2>
        <br />
        <br />
        {switches.map((nodeSwitch) => (
            <div key={nodeSwitch.Id}>{nodeSwitch.Name}</div>
        ))}
        </>
    )
}