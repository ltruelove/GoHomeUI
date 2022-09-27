import React, {Component} from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import NodeListItem from "./NodeListItem";

class ControlPointData extends Component{
    constructor(props){
        super(props);

        this.state = {
            recordId : props.id,
            record: {},
            allNodes: []
        };

        this.getNodeData = this.getNodeData.bind(this);
    }

    getNodeData(nodeId){
        let nodes = this.state.allNodes;
        axios.get('http://' + this.state.record.IpAddress + '/nodeData?nodeId=' + nodeId)
        .then(res=>{
            console.log(res);
            for(var i = 0; i < nodes.length; i++){
                var node = nodes[i];

                if(node.Id === nodeId){
                    node.details = res.data;
                    nodes[i] = node;
                }
            }

            this.setState({allNodes: nodes});
        })
        .catch(err=>console.log(err))
    }

    componentDidMount(){
        axios.get(process.env.REACT_APP_API_URL + '/controlPoint/' + this.state.recordId)
        .then(res=>{
            this.setState({record: res.data})
        })
        .catch(err=>console.log(err))

        axios.get(process.env.REACT_APP_API_URL + '/controlPoint/nodes/' + this.state.recordId)
        .then(res=>{
            if(res.data){
                this.setState({allNodes: res.data})
            }
        })
        .catch(err=>console.log(err))
    }

    render(){
        return (
            <>
            <p>Name: {this.state.record.Name}</p>
            <p>IP Address: {this.state.record.IpAddress}</p>
            <p>MAC Address: {this.state.record.Mac}</p>
            <h3>Nodes</h3>
            <ul>
                {this.state.allNodes.map((node) => (
                    <li key={node.Id}>
                        <NodeListItem getNodeData={this.getNodeData} Id={node.Id} Name={node.Name} details={node.details} />
                    </li>
                ))}
            </ul>
            </>
        )
    }
}

export default ControlPointData;