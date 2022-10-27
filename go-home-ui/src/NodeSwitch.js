import React, {Component} from "react";
import axios from "axios";

class NodeSwitch extends Component{
    constructor(props){
        super(props);
        
        props.nodeSwitch.label = "";
        props.nodeSwitch.ViewId = parseInt(props.viewId);

        this.state = {
            nodeSwitch: props.nodeSwitch,
            labelValid: false,
            isChecked: false,
            id: 0
        }

        this.addSelected = this.addSelected.bind(this);
        this.removeSelected = this.removeSelected.bind(this);
        this.toggleSelectedSwitch = this.toggleSelectSwitch.bind(this);
        this.handleLabelChange = this.handleLabelChange.bind(this);
        this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    }

    handleCheckboxChange(event){
        var nodeSwitch = this.state.nodeSwitch;
        nodeSwitch.isChecked = event.target.checked;

        this.setState({nodeSwitch: nodeSwitch});
        this.toggleSelectedSwitch(event, nodeSwitch);
    }

    handleLabelChange(event){
        let valid = false;
        let nodeSwitch = this.state.nodeSwitch;
        nodeSwitch.label = event.target.value;

        let trimmedLabel = nodeSwitch.label.replace(/\s+/g, '');
        if(trimmedLabel !== ''){
            valid = true;
        }

        this.setState({nodeSwitch: nodeSwitch, labelValid: valid});
    }

    toggleSelectSwitch(event){
        if(event.target.checked){
            this.addSelected();
        }else{
            this.removeSelected();
        }
    }

    addSelected(){
        let nodeSwitchData = {
            Id : 0,
            NodeId : this.state.nodeSwitch.NodeId,
            ViewId : this.state.nodeSwitch.ViewId,
            NodeSwitchId : this.state.nodeSwitch.Id,
            Name: this.state.nodeSwitch.label
        }

        axios.post(process.env.REACT_APP_API_URL + '/view/node/switch', nodeSwitchData)
        .then(res=>{
            this.setState({id: res.data.Id});
        })
        .catch(err=>alert(err.response.data))
    }

    removeSelected(){
        axios.delete(process.env.REACT_APP_API_URL + '/view/node/switch/' + this.state.id)
        .then(res=>{
            this.setState({id: 0});
        })
        .catch(err=>alert(err.response.data))
    }

    render(){
        return(
            <li>
                Name: {this.state.nodeSwitch.Name}, Type: {this.state.nodeSwitch.SwitchTypeName}, Pin: {this.state.nodeSwitch.Pin}
                &nbsp;- <label>
                    Label&nbsp;
                    <input type="text" id={"label" + this.state.nodeSwitch.Id} disabled={this.state.nodeSwitch.isChecked} value={this.state.nodeSwitch.label} onChange={this.handleLabelChange} />&nbsp;
                </label>
                <label>
                    Add to view&nbsp;
                    <input type="checkbox" id={"checkbox" + this.state.nodeSwitch.Id} disabled={!this.state.labelValid} onChange={this.handleCheckboxChange} />&nbsp;
                </label>
            </li>
        )
    }
}

export default NodeSwitch;