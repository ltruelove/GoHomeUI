import React from "react";
// @ts-ignore
import NodeSwitch from "./NodeSwitch.tsx";
import { NodeSwitchVM } from "../../Models/NodeSwitchVM";
// @ts-ignore
import { NodeVM } from "../../Models/NodeVM";

interface NodeSwitchListProps {
    viewId: number,
    node: NodeVM,
    switchIsSelected(id: number): boolean
}

export default function NodeSwitchList(props: NodeSwitchListProps){
    const viewId = props.viewId;
    const node = props.node;
    const switchIsSelected = props.switchIsSelected;

    return (
        <li key={node.Id}>Name: {node.Name}
        {node.switches &&
            <>
            <p>Available Switches</p>
            <ul>
                {node.switches.map((nodeSwitch: NodeSwitchVM) => {
                    return (
                        !switchIsSelected(nodeSwitch.Id) &&
                            <NodeSwitch key={nodeSwitch.Id} nodeSwitch={nodeSwitch} viewId={viewId} />
                    )
                })}
            </ul> 
            </>
        }
        <br />
        </li>
    )
}