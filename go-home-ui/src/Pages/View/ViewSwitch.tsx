import React,{useState} from "react";
import axios from "axios";
import { NodeSwitchVM } from "../../Models/NodeSwitchVM";
// @ts-ignore
import apiUrl from "../../index.tsx";

interface SwitchData {
    nodeSwitch: NodeSwitchVM,
    pin: number
}

export function ViewSwitch(props:SwitchData){
    const pin = props.pin;
    const nodeSwitch = props.nodeSwitch;

    const button = () => {
        if(nodeSwitch.SwitchTypeName === "Momentary"){
            return (
                <button onClick={() => pressMomentary(nodeSwitch.NodeSwitchId)}>Press Button</button>
            )
        }else{
            return (
                <button onClick={() => toggleButton(nodeSwitch.NodeSwitchId)}>Toggle Switch</button>
            )
        }
    }

    const pressMomentary = (switchId: number) => {
        const requestBody = JSON.stringify({"pinCode" : pin});
        const url = apiUrl + '/node/switch/press/' + switchId;

        axios.post(url, requestBody)
        .then(res=>{
        })
        .catch(err=>alert(err.response.data))
    }

    const toggleButton = (switchId: number) => {
        const requestBody = JSON.stringify({"pinCode" : pin});
        const url = apiUrl + '/node/switch/toggle/' + switchId;

        axios.post(url, requestBody)
        .then(res=>{
        })
        .catch(err=>alert(err.response.data))
    }

    return (
        <div>{nodeSwitch.Name} {button()}</div>
    )
}