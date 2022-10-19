import React, {Component} from "react";
import axios from "axios";

class NodeData extends Component{
    constructor(props){
        super(props);

        this.state = {
            recordId : props.id,
            record: {},
            data: null,
            allSensors: [],
            allSwitches: [],
            pin: ""
        };

        this.deleteNodeClick = this.deleteNode.bind(this);
        this.getNodeData = this.getNodeData.bind(this);
        this.handlePIN = this.handlePIN.bind(this);
        this.toggleButton = this.toggleButton.bind(this);
        this.pressMomentary = this.pressMomentary.bind(this);
    }

    handlePIN = event => {
        this.setState({ pin: event.target.value });
    };

    getNodeData(nodeId){
        axios.get('http://' + this.state.record.controlPointIp + '/nodeData?nodeId=' + nodeId)
        .then(res=>{
            this.setState({data: res.data});
        })
        .catch(err=>console.log(err))
    }

    toggleButton(switchId){
        const requestBody = JSON.stringify({"pinCode" : this.state.pin});
        const url = process.env.REACT_APP_API_URL + '/node/switch/toggle/' + switchId;
        let id = this.state.recordId;

        axios.post(url, requestBody)
        .then(res=>{
            console.log(res);
            this.setState({data: res.data}, () => {
                setTimeout(() => {
                    this.getNodeData(id);
                }, 100);
            });
        })
        .catch(err=>alert(err.response.data))
    }

    pressMomentary(switchId){
        const requestBody = JSON.stringify({"pinCode" : this.state.pin});
        const url = process.env.REACT_APP_API_URL + '/node/switch/press/' + switchId;
        let id = this.state.recordId;

        axios.post(url, requestBody)
        .then(res=>{
            console.log(res);
            this.setState({data: res.data}, () => {
                setTimeout(() => {
                    this.getNodeData(id);
                }, 100);
            });
        })
        .catch(err=>alert(err.response.data))
    }

    componentDidMount(){
        axios.get(process.env.REACT_APP_API_URL + '/node/' + this.state.recordId)
        .then(res=>{
            console.log(res);
            this.setState({
                record: res.data,
                allSensors: res.data.sensors,
                allSwitches: res.data.switches
            }, () => {
                this.getNodeData(res.data.Id);
            })
        })
        .catch(err=>console.log(err))
    }

    deleteNode(event) {
        const id = event.target.id;
        console.log(id);

        if(window.confirm("Are you sure you want to delete this node?")){
            axios.delete(process.env.REACT_APP_API_URL + '/node/' + id + '/delete')
            .then(res=>{
                console.log(res);
                window.location = "/nodes";
            })
            .catch(err=>console.log(err))
        }
    }

    displaySensorData(sensor){
        if(!this.state.data){
            return;
        }

        switch(sensor.SensorTypeId){
            case 1:
                return <div key={sensor.Id}>
                    <p>{sensor.Name}</p>
                    <p>Humidity: {this.state.data.Humidity}</p>
                    <p>Temperature F: {this.state.data.TemperatureF}</p>
                    <p>Temperature C: {this.state.data.TemperatureC}</p>
                </div>
            case 2:
                return <p key={sensor.Id}>{sensor.Name}: {this.state.data.Moisture}</p>
            case 3:
                return <p key={sensor.Id}>{sensor.Name}: {this.state.data.Magnetic}</p>
            case 4:
                return <p key={sensor.Id}>{sensor.Name}: {this.state.data.ResistorValue}</p>
            default:
                return <p div key={sensor.Id}>Invalid Input</p>
        }
    }

    displaySwitchData(nodeSwitch){
        console.log(nodeSwitch);
        if(!this.state.data){
            return;
        }

        switch(nodeSwitch.SwitchTypeId){
            case 1:
                return <div key={nodeSwitch.Id}>
                    <button onClick={() => this.pressMomentary(nodeSwitch.Id)}>Press {nodeSwitch.Name} Switch</button>
                    &nbsp; for {nodeSwitch.MomentaryPressDuration} milliseconds
                </div>
            case 2:
                return <div key={nodeSwitch.Id}>
                    <p>Circuit Closed: {this.state.data.IsClosed ? "Yes":"No"}</p>
                    <button onClick={() => this.toggleButton(nodeSwitch.Id)}>Toggle {nodeSwitch.Name} Switch</button>
                </div>
            default:
                return <p div key={nodeSwitch.Id}>Invalid Input</p>
        }
    }

    render(){
        return (
            <>
            <p>PIN: <input onChange={this.handlePIN} type="password" id="requestPIN" /></p>
            <h2>Node Details</h2>
            <p>Name: {this.state.record.Name}</p>
            <p>IP Address: {this.state.record.IpAddress}</p>
            <p>MAC Address: {this.state.record.Mac}</p>
            <button id={this.props.id} onClick={this.deleteNodeClick}>Delete</button>
            <button onClick={() => this.getNodeData(this.state.recordId)}>Refresh</button>
            <br />
            
            <h2>Node Sensors</h2>
            {this.state.allSensors.map((sensor) => (
                this.displaySensorData(sensor)
            ))}

            <h2>Node Switches</h2>
            {this.state.allSwitches.map((nodeSwitch) => (
                this.displaySwitchData(nodeSwitch)
            ))}
            </>
        )
    }
}

export default NodeData;