import React, {Component} from "react";
import axios from "axios";

class NodeData extends Component{
    constructor(props){
        super(props);

        this.state = {
            recordId : props.id,
            record: {},
            allSensors: [],
            allSwitches: []
        };

        this.deleteNodeClick = this.deleteNode.bind(this);
    }

    componentDidMount(){
        axios.get(process.env.REACT_APP_API_URL + '/node/' + this.state.recordId)
        .then(res=>{
            this.setState({record: res.data})
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
                //window.location = "/nodes";
            })
            .catch(err=>console.log(err))
        }
    }

    render(){
        return (
            <>
            <p>Name: {this.state.record.Name}</p>
            <p>IP Address: {this.state.record.IpAddress}</p>
            <p>MAC Address: {this.state.record.Mac}</p>
            <button id={this.props.id} onClick={this.deleteNodeClick}>Delete</button>
            </>
        )
    }
}

export default NodeData;