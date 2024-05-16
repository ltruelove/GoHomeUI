import React,{useState} from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
// @ts-ignore
import { ViewSwitch } from "./ViewSwitch.tsx";
// @ts-ignore
import { ViewSensor } from "./ViewSensor.tsx";
// @ts-ignore
import apiUrl from "../../index.tsx";
import { NodeVM } from "../../Models/NodeVM";
import { NodeSensorVM } from "../../Models/NodeSensorVM";
import useApi from "./useApi.ts";
import useViewApi from "./ViewAPI.ts";

export default function ViewDetail(){
    const [pin, setPin] = useState("");
    const { id } = useParams();
    const getViewRequest = {url: apiUrl + '/view/' + id};

    const {
        useGetNodeIds: getNodeIds,
        useGetNodes: getNodes,
    } = useViewApi(apiUrl);

    const viewData = useApi(getViewRequest);
    const nodeIdList: number[] = getNodeIds(viewData.data);
    const nodes: NodeVM[] = getNodes(nodeIdList);

    /*
    const viewData = getView({url: apiUrl + '/view/' + id}).data;
    const nodeIdList = getNodeIds(viewData);
    const nodes = getNodes(nodeIdList);
    */

    const pinChanged = (event: React.ChangeEvent<HTMLInputElement>) =>{
        setPin(event.target.value);
    }

    const getSensorNode = (sensor:NodeSensorVM, nodes:NodeVM[]): NodeVM | null => {
        console.log(nodes);
        let foundNode: NodeVM | null = null;

        nodes.forEach((node) => {
            if(node.Id === sensor.NodeId){
                foundNode = node;
            }
        })

        return foundNode;
    }

    return (
        <div className="ViewDetail">
            {viewData.loading && <div>Loading...</div>}
            {!viewData.loading && (
            <>
                <h2>{viewData.data.Name}</h2>
                <br />
                <Link className="App-link" to={`/view/edit/${id}`}>Edit</Link>
                <br />
                { viewData.data.sensors && viewData.data.sensors.length > 0 ? 
                <>
                <h2>Sensors</h2>
                <br />
                <br />
                {viewData.data.sensors.map((sensor) => {
                    return (
                        <ViewSensor key={sensor.Id} nodeSensor={sensor} node={getSensorNode(sensor,nodes)} />
                    )
                })}
                </> : "" }

                {viewData.data.switches && viewData.data.switches.length > 0 ? 
                <>
                <h2>Switches</h2>
                <p>PIN: <input onChange={pinChanged} type="password" id="requestPIN" /></p>
                <br />
                <br />
                {viewData.data.switches.map((nodeSwitch) => (
                    <ViewSwitch key={nodeSwitch.Id} nodeSwitch={nodeSwitch} pin={pin} />
                ))}
                </> : ""}
            </>
            )
        }
        </div>
    )
}