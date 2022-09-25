import React, {Component} from "react";
import axios from "axios";
import { Link } from "react-router-dom";

class ControlPointData extends Component{
    constructor(props){
        super(props);

        this.state = {
            recordId : props.id,
            record: {},
            allNodes: []
        };
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
                        <Link className="App-link" to={`/node/${node.Id}`}>{node.Name}</Link>
                    </li>
                ))}
            </ul>
            </>
        )
    }
}

export default ControlPointData;