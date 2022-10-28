import React, {useState} from "react";
import axios from "axios";

export default function NodeSensor(props){
    props.sensor.label = "";
    props.sensor.ViewId = parseInt(props.viewId);

    const [sensor, setSensor] = useState(props.sensor);
    const [labelValid, setLabelValid] = useState(false);
    const [id, setId] = useState(0);

    const addSelected = () => {
        let sensorData = {
            Id : 0,
            NodeId : sensor.NodeId,
            ViewId : sensor.ViewId,
            NodeSensorId : sensor.Id,
            Name: sensor.label
        }

        axios.post(process.env.REACT_APP_API_URL + '/view/node/sensor', sensorData)
        .then(res=>{
            setId(res.data.Id);
        })
        .catch(err=>alert(err.response.data))
    }

    const removeSelected = () => {
        axios.delete(process.env.REACT_APP_API_URL + '/view/node/sensor/' + id)
        .then(res=>{
            setId(0);
        })
        .catch(err=>alert(err.response.data))
    }

    const toggleSelectSensor = (event) => {
        if(event.target.checked){
            addSelected();
        }else{
            removeSelected();
        }
    }

    const checkboxChanged = (event) => {
        setSensor({...sensor, isChecked: event.target.checked});
        toggleSelectSensor(event);
    }

    const labelChanged = (event) => {
        let valid = false;
        let label = event.target.value;

        let trimmedLabel = label.replace(/\s+/g, '');
        if(trimmedLabel !== ''){
            valid = true;
        }

        setSensor({...sensor, label: label});
        setLabelValid(valid);
    }

    return(
        <li>
            Name: {sensor.Name}, Type: {sensor.SensorTypeName}, Pin: {sensor.Pin}
            &nbsp;- <label>
                Label&nbsp;
                <input type="text" id={"label" + sensor.Id} disabled={sensor.isChecked} value={sensor.label} onChange={labelChanged} />&nbsp;
            </label>
            <label>
                Add to view&nbsp;
                <input type="checkbox" id={"checkbox" + sensor.Id} disabled={!labelValid} onChange={checkboxChanged} />&nbsp;
            </label>
        </li>
    )
}