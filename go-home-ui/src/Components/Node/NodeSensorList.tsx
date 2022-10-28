import React from "react";
// @ts-ignore
import NodeSensor from "./NodeSensor.tsx";
import { NodeSensorVM } from "../../Models/NodeSensorVM";
// @ts-ignore
import { NodeVM } from "../../Models/NodeVM";

interface NodeSensorListProps{
    viewId: number,
    node: NodeVM,
    sensorIsSelected(id: number): boolean
}

export default function NodeSensorList(props: NodeSensorListProps){
    const node = props.node;
    const viewId = props.viewId;
    const sensorIsSelected = props.sensorIsSelected;

    return (
        <li key={node.Id}>Name: {node.Name}
        {node.sensors &&
            <>
            <p>Available Sensors</p>
            <ul>
                {node.sensors.map((sensor: NodeSensorVM) => {
                    sensor.IsChecked = false;

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
