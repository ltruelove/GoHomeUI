import React, {useState} from "react";
import axios from "axios";

export default function NodeSwitch(props) {
    props.nodeSwitch.label = "";
    props.nodeSwitch.ViewId = parseInt(props.viewId);

    const [nodeSwitch, setNodeSwitch] = useState(props.nodeSwitch);
    const [labelValid, setLabelValid] = useState(false);
    const [id, setId] = useState(0);

    const addSelected = () => {
        let nodeSwitchData = {
            Id : 0,
            NodeId : nodeSwitch.NodeId,
            ViewId : nodeSwitch.ViewId,
            NodeSwitchId : nodeSwitch.Id,
            Name: nodeSwitch.label
        }

        axios.post(process.env.REACT_APP_API_URL + '/view/node/switch', nodeSwitchData)
        .then(res=>{
            console.log(res.data);
            setId(res.data.Id);
        })
        .catch(err=>alert(err.response.data))
    }

    const removeSelected = () => {
        axios.delete(process.env.REACT_APP_API_URL + '/view/node/switch/' + id)
        .then(res=>{
            setId(0);
        })
        .catch(err=>alert(err.response.data))
    }

    const toggleSelectSwitch = (event) => {
        if(event.target.checked){
            addSelected();
        }else{
            removeSelected();
        }
    }

    const checkboxChanged = (event) =>{
        setNodeSwitch({...nodeSwitch, isChecked: event.target.checked});
        toggleSelectSwitch(event, nodeSwitch);
    }

    const labelChanged = (event) => {
        let valid = false;
        let label = event.target.value;

        let trimmedLabel = label.replace(/\s+/g, '');
        if(trimmedLabel !== ''){
            valid = true;
        }
        setNodeSwitch({...nodeSwitch, label: label});
        setLabelValid(valid);
    }

    return(
        <li>
            Name: {nodeSwitch.Name}, Type: {nodeSwitch.SwitchTypeName}, Pin: {nodeSwitch.Pin}
            &nbsp;- <label>
                Label&nbsp;
                <input type="text" id={"label" + nodeSwitch.Id} disabled={nodeSwitch.isChecked} value={nodeSwitch.label} onChange={labelChanged} />&nbsp;
            </label>
            <label>
                Add to view&nbsp;
                <input type="checkbox" id={"checkbox" + nodeSwitch.Id} disabled={!labelValid} onChange={checkboxChanged} />&nbsp;
            </label>
        </li>
    )
}