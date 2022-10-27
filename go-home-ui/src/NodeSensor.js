import React, {Component} from "react";
import axios from "axios";

class NodeSensor extends Component{
    constructor(props){
        super(props);
        
        props.sensor.label = "";
        props.sensor.ViewId = parseInt(props.viewId);

        this.state = {
            sensor: props.sensor,
            labelValid: false,
            isChecked: false,
            id: 0
        }

        this.addSelected = this.addSelected.bind(this);
        this.removeSelected = this.removeSelected.bind(this);
        this.toggleSelectedSensor = this.toggleSelectSensor.bind(this);
        this.handleLabelChange = this.handleLabelChange.bind(this);
        this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    }

    handleCheckboxChange(event){
        var sensor = this.state.sensor;
        sensor.isChecked = event.target.checked;

        this.setState({sensor: sensor});
        this.toggleSelectedSensor(event, sensor);
    }

    handleLabelChange(event){
        let valid = false;
        let sensor = this.state.sensor;
        sensor.label = event.target.value;

        let trimmedLabel = sensor.label.replace(/\s+/g, '');
        if(trimmedLabel !== ''){
            valid = true;
        }

        this.setState({sensor: sensor, labelValid: valid});
    }

    toggleSelectSensor(event){
        if(event.target.checked){
            this.addSelected();
        }else{
            this.removeSelected();
        }
    }

    addSelected(){
        let sensorData = {
            Id : 0,
            NodeId : this.state.sensor.NodeId,
            ViewId : this.state.sensor.ViewId,
            NodeSensorId : this.state.sensor.Id,
            Name: this.state.sensor.label
        }

        axios.post(process.env.REACT_APP_API_URL + '/view/node/sensor', sensorData)
        .then(res=>{
            this.setState({id: res.data.Id});
        })
        .catch(err=>alert(err.response.data))
    }

    removeSelected(){
        axios.delete(process.env.REACT_APP_API_URL + '/view/node/sensor/' + this.state.id)
        .then(res=>{
            this.setState({id: 0});
        })
        .catch(err=>alert(err.response.data))
    }

    render(){
        return(
            <li>
                Name: {this.state.sensor.Name}, Type: {this.state.sensor.SensorTypeName}, Pin: {this.state.sensor.Pin}
                &nbsp;- <label>
                    Label&nbsp;
                    <input type="text" id={"label" + this.state.sensor.Id} disabled={this.state.sensor.isChecked} value={this.state.sensor.label} onChange={this.handleLabelChange} />&nbsp;
                </label>
                <label>
                    Add to view&nbsp;
                    <input type="checkbox" id={"checkbox" + this.state.sensor.Id} disabled={!this.state.labelValid} onChange={this.handleCheckboxChange} />&nbsp;
                </label>
            </li>
        )
    }
}

export default NodeSensor;