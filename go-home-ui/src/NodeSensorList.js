import React from "react";
import NodeSensor from "./NodeSensor";

export default function NodeSensorList(props){
    const node = props.node;
    const viewId = props.viewId;
    const sensorIsSelected = props.sensorIsSelected;

    return (
        <li key={node.Id}>Name: {node.Name}
        {node.sensors &&
            <>
            <p>Available Sensors</p>
            <ul>
                {node.sensors.map((sensor) => {
                    sensor.isChecked = false;

                    return (
                        !sensorIsSelected(sensor.Id) &&
                            <NodeSensor key={sensor.Id} sensor={sensor} viewId={viewId} />
                    )
                })}
            </ul> 
            </>
        }
        <br />
        </li>
    )
}
