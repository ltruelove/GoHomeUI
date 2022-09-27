import React, {Component} from "react";
import { Link } from "react-router-dom";

class NodeListItem extends Component{
    constructor(props){
        super(props);

        this.getNodeData = props.getNodeData.bind(this);
    }

    componentDidMount(){
    }


    render(){
        let details;
        if(this.props.details){
            details = <div>
                <p>Humidity: {this.props.details.Humidity}</p>
                <p>Moisture: {this.props.details.Moisture}</p>
                <p>Temperature F: {this.props.details.TemperatureF}</p>
                <p>Termperature C: {this.props.details.TemperatureC}</p>
                <p>Toggle Is Closed: {this.props.details.IsClosed ? "Yes" : "No"}</p>
                <p>Resistor Value: {this.props.details.ResistorValue}</p>
                </div>
        }
        return (
            <>
                <Link className="App-link" to={`/node/${this.props.Id}`}>{this.props.Name}</Link> - <Link onClick={() => this.getNodeData(this.props.Id)} className="App-link">Details</Link>
                {details}
            </>
        )
    }
}

export default NodeListItem;