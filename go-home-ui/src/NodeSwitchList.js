import React from "react";
import NodeSwitch from "./NodeSwitch";

export default function NodeSwitchList(props){
    const viewId = props.viewId;
    const node = props.node;
    const switchIsSelected = props.switchIsSelected;

    return (
        <li key={node.Id}>Name: {node.Name}
        {node.switches &&
            <>
            <p>Available Switches</p>
            <ul>
                {node.switches.map((nodeSwitch) => {
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