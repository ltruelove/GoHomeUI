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

    toggleButton(){
        const requestBody = JSON.stringify({"pinCode" : this.state.pin});
        const url = process.env.REACT_APP_API_URL + '/node/switch/toggle/' + this.state.recordId;
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
        .catch(err=>console.log(err))
    }

    componentDidMount(){
        axios.get(process.env.REACT_APP_API_URL + '/node/' + this.state.recordId)
        .then(res=>{
            console.log(res);
            this.setState({record: res.data}, () => {
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

    render(){
        let data = <></>;

        if(this.state.data){
            data = <>
                <p>Humidity: {this.state.data.Humidity}</p>
                <p>Temperature F: {this.state.data.TemperatureF}</p>
                <p>Temperature C: {this.state.data.TemperatureC}</p>
                <p>Moisture: {this.state.data.Moisture}</p>
                <p>Resistor Value: {this.state.data.ResistorValue}</p>
                <p>Toggle Closed: {this.state.data.IsClosed ? "Yes":"No"}</p>
                </>
        }

        return (
            <>
            <p>Name: {this.state.record.Name}</p>
            <p>IP Address: {this.state.record.IpAddress}</p>
            <p>MAC Address: {this.state.record.Mac}</p>
            {data}
            <button id={this.props.id} onClick={this.deleteNodeClick}>Delete</button>
            <button onClick={() => this.getNodeData(this.state.recordId)}>Details</button>
            <br />
            <p>PIN: <input onChange={this.handlePIN} type="password" id="requestPIN" /></p>
            
            <button onClick={this.toggleButton}>Toggle Button</button>
            </>
        )
    }
}

export default NodeData;