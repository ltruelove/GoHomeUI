import React, {Component} from "react";
import axios from "axios";
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
        this.deleteControlPointClick = this.deleteControlPointClick.bind(this);
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

    deleteControlPointClick(event) {
        const id = event.target.id;
        console.log(id);

        if(window.confirm("Are you sure you want to delete this control point?")){
            axios.delete(process.env.REACT_APP_API_URL + '/controlPoint/' + id + '/delete')
            .then(res=>{
                console.log(res);
                window.location = "/controlPoints";
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
            <button id={this.props.id} onClick={this.deleteControlPointClick}>Delete</button>
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