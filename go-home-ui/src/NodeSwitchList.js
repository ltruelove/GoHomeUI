import React, {Component} from "react";
import NodeSwitch from "./NodeSwitch";

class NodeSwitchList extends Component{
    constructor(props){
        super(props);
        this.node = props.node;
        
        this.state = {
            selected: [],
            viewId: props.viewId
        }

        this.switchIsSelected = props.switchIsSelected;
    }

    render(){
        return (
            <li key={this.node.Id}>Name: {this.node.Name}
            {this.node.switches &&
                <>
                <p>Available Switches</p>
                <ul>
                    {this.node.switches.map((nodeSwitch) => {
                        return (
                            !this.switchIsSelected(nodeSwitch.Id) &&
                                <NodeSwitch key={nodeSwitch.Id} nodeSwitch={nodeSwitch} viewId={this.state.viewId} />
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

export default NodeSwitchList;