import React, {Component} from "react";
import NodeSensor from "./NodeSensor";

class NodeSensorList extends Component{
    constructor(props){
        super(props);
        this.node = props.node;
        
        this.state = {
            selected: [],
            viewId: props.viewId
        }

        this.sensorIsSelected = props.sensorIsSelected;
    }

    handleTextChange(event, sensor){
        sensor.label = event.target.value;
    }

    render(){
        return (
            <li key={this.node.Id}>Name: {this.node.Name}
            {this.node.sensors &&
                <>
                <p>Available Sensors</p>
                <ul>
                    {this.node.sensors.map((sensor) => {
                        sensor.isChecked = false;

                        return (
                            !this.sensorIsSelected(sensor.Id) &&
                                <NodeSensor key={sensor.Id} sensor={sensor} viewId={this.state.viewId} />
                        )
                    })}
                </ul> 
                </>
            }
            <br />
            </li>
        )
    }
}

export default NodeSensorList;