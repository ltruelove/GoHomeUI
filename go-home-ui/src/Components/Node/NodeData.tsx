import React, {useEffect, useState} from "react";
import axios from "axios";
// @ts-ignore
import TempHumidity from "../View/TempHumidity.tsx";
// @ts-ignore
import TempFChart from "./TempFChart.tsx";
// @ts-ignore
import TempCChart from "./TempCChart.tsx";
// @ts-ignore
import HumidityChart from "./HumidityChart.tsx";
// @ts-ignore
import MoistureChart from "./MoistureChart.tsx";
// @ts-ignore
import ResistorChart from "./ResistorChart.tsx";
// @ts-ignore
import IsClosedChart from "./IsClosedChart.tsx";
// @ts-ignore
import { FlatLog } from "../../Models/FlatLog.tx";
// @ts-ignore
import apiUrl from "../../index.tsx";
import { useNavigate } from "react-router-dom";
import { NodeVM } from "../../Models/NodeVM";
import { NodeDataModel } from "../../Models/NodeDataModel";
import { NodeSensorVM } from "../../Models/NodeSensorVM";
import { NodeSwitchVM } from "../../Models/NodeSwitchVM";
import moment from "moment-timezone";

const defaultNodeData: NodeDataModel = {
    Humidity: 0,
    Moisture: 0,
    TemperatureF: 0,
    TemperatureC: 0,
    IsClosed: false,
    ResistorValue: 0,
    MagneticValue: 0,
    nodeId: 0
};

interface NodeDataProps {
    Id: number
}


const defaultNodeRecord: NodeVM = {
    Id: 0,
    Name: "",
    Mac: "",
    IpAddress: "",
    controlPointId: 0,
    controlPointIp: "",
    controlPointName: "",
    sensors: [],
    switches: []
}

export default function NodeData(props: NodeDataProps){
    const navigate = useNavigate();
    const [data, setData] = useState<NodeDataModel>(defaultNodeData);
    const [pin, setPin] = useState("");
    const [logs, setLogs] = useState<FlatLog[]>([]);
    const [showTemp, setShowTemp] = useState(false);
    const [showMoisture, setShowMoisture] = useState(false);
    const [showResistor, setShowResistor] = useState(false);
    const [showMagnetic, setShowMagnetic] = useState(false);

    let id = props.Id;
    const [record, setRecord] = useState<NodeVM>({...defaultNodeRecord, Id: id});

    const getNodeRecord = () => {
        axios.get(apiUrl + '/node/' + id)
        .then(res=>{
            if(!res.data.sensors){
                res.data.sensors = [];
            }
            if(!res.data.switches){
                res.data.switches = [];
            }

            setRecord(res.data);

            getNodeData(res.data);
            getNodeLogs(res.data);
        })
        .catch(err=>console.log(err))
    }

    const pinChanged = (event: React.ChangeEvent<HTMLInputElement>) =>{
        setPin(event.target.value);
    }

    const getNodeData = (node: NodeVM) => {
                axios.get(apiUrl + '/node/data/' + node.Id)
                .then(res=>{
                    setData(res.data);
                })
                .catch(err=>console.log(err))
    }

    const refreshData = () => {
        axios.post(apiUrl + '/node/update/' + record.Id)
        .then(res=>{
            // there needs to be a slight delay before fetching the updated data
            setTimeout(() => {
                getNodeRecord();
            }, 50);
        })
        .catch(err=>console.log(err))
    }

    const getNodeLogs = (node: NodeVM) => {
        axios.get(apiUrl + '/node/logs/' + node.Id)
        .then(res=>{
            let tempF: FlatLog[] = [];

            for(let i = 0; i < res.data.length; i++){
                let record = res.data[i];
                let dateLogged = moment(record.DateLogged);

                let flatRecord: FlatLog = {
                    DateLabel: dateLogged.format('L') + " " + dateLogged.format('LT'),
                    DateLogged: record.DateLogged
                }

                if(record.TemperatureEntries){
                    flatRecord.TemperatureF = record.TemperatureEntries[0].TemperatureF;
                    flatRecord.TemperatureC = record.TemperatureEntries[0].TemperatureC;
                    flatRecord.Humidity = record.TemperatureEntries[0].Humidity;
                    setShowTemp(true);
                }else{
                    setShowTemp(false);
                }

                if(record.MoistureEntries){
                    flatRecord.Moisture = record.MoistureEntries[0].Moisture;
                    setShowMoisture(true);
                }else{
                    setShowMoisture(false);
                }

                if(record.ResistorEntries){
                    flatRecord.Resistor = record.ResistorEntries[0].Resistor;
                    setShowResistor(true);
                }else{
                    setShowResistor(false);
                }

                if(record.MagneticEntries){
                    flatRecord.IsClosed = record.MagneticEntries[0].IsClosed ? 'Yes' : 'No';
                    setShowMagnetic(true);
                }else{
                    setShowMagnetic(false);
                }
                
                tempF.push(flatRecord);
            }

            setLogs(tempF);
        })
        .catch(err=>console.log(err))
    }

    const toggleButton = (switchId: number) => {
        const requestBody = JSON.stringify({"pinCode" : pin});
        const url = apiUrl + '/node/switch/toggle/' + switchId;

        axios.post(url, requestBody)
        .then(res=>{
            setData(res.data);
            getNodeData(record);
        })
        .catch(err=>alert(err.response.data))
    }

    const pressMomentary = (switchId: number) => {
        const requestBody = JSON.stringify({"pinCode" : pin});
        const url = apiUrl + '/node/switch/press/' + switchId;

        axios.post(url, requestBody)
        .then(res=>{
            setData(res.data);
            getNodeData(record);
        })
        .catch(err=>alert(err.response.data))
    }

    const updateNode = () => {
        const requestBody = JSON.stringify({"pinCode" : pin});
        const url = apiUrl + '/node/updateMode/' + record.Id;

        axios.post(url, requestBody)
        .then(res=>{
            //give the node some time to update its IP
            setTimeout(() => {
                getNodeRecord();
            }, 200);
        })
        .catch(err=>alert(err.response.data))
    }

    const deleteNode = (event: React.MouseEvent<HTMLButtonElement>) => {
        if(window.confirm("Are you sure you want to delete this node?")){
            axios.delete(apiUrl + '/node/' + record.Id + '/delete')
            .then(res=>{
                navigate("/nodes");
            })
            .catch(err=>console.log(err))
        }
    }

    const editNode =  (event: React.MouseEvent<HTMLButtonElement>) => {
        navigate("/node/edit/" + record.Id);
    }

    const displaySensorData = (sensor: NodeSensorVM) => {
        if(!data){
            return;
        }

        switch(sensor.SensorTypeId){
            case 1:
                return <TempHumidity key={sensor.Id} sensorName={sensor.Name} data={data} />
            case 2:
                return <p key={sensor.Id}>{sensor.Name}: {data.Moisture}</p>
            case 3:
                return <p key={sensor.Id}>{sensor.Name}: {data.MagneticValue > 0 ? 'Closed' : 'Open'}</p>
            case 4:
                return <p key={sensor.Id}>{sensor.Name}: {data.ResistorValue}</p>
            default:
                return <p key={sensor.Id}>Invalid Input</p>
        }
    }

    const displaySwitchData = (nodeSwitch: NodeSwitchVM) => {
        if(!data){
            return;
        }

        switch(nodeSwitch.SwitchTypeId){
            case 1:
                return <div key={nodeSwitch.Id}>
                    <button onClick={() => pressMomentary(nodeSwitch.Id)}>Press {nodeSwitch.Name} Switch</button>
                    &nbsp; for {nodeSwitch.MomentaryPressDuration} milliseconds
                </div>
            case 2:
                return <div key={nodeSwitch.Id}>
                    <button onClick={() => toggleButton(nodeSwitch.Id)}>Toggle {nodeSwitch.Name} Switch</button>
                    &nbsp; (Circuit is {data.IsClosed ? "closed":"open"})
                </div>
            default:
                return <p key={nodeSwitch.Id}>Invalid Input</p>
        }
    }

    useEffect(() => {
        getNodeRecord();
    }, [id]);

    return (
        <div className="NodeData">
            <div className="NodeDetails">
                <h2>Node Details </h2>
                <p>Name: {record.Name}</p>
                <p>MAC Address: {record.Mac}</p>
                {record.IpAddress ? 
                <p>Most Recent IP Address: {record.IpAddress}</p>
                :null
                }
                <button onClick={deleteNode}>Delete</button>
                <button onClick={() => refreshData()}>Refresh</button>
                <button onClick={editNode}>Edit Name</button>
                <button onClick={updateNode}>Enter Update Mode</button>
                <br />
                <br />
                
                <h2>Node Sensors</h2>
                {record.sensors.map((sensor) => (
                    displaySensorData(sensor)
                ))}

                <br />
                <h2>Node Switches</h2>
                <p>PIN: <input onChange={pinChanged} type="password" id="requestPIN" /></p>
                {record.switches.map((nodeSwitch) => (
                    displaySwitchData(nodeSwitch)
                ))}
                <br />
                <br />

                <h2>Sensor Logs</h2>
            </div>

            {showTemp ? 
            <>
                <div className="SensorChart">
                <TempFChart data={logs}></TempFChart>
                </div>

                <div className="SensorChart">
                <TempCChart data={logs}></TempCChart>
                </div>

                <div className="SensorChart">
                <HumidityChart data={logs}></HumidityChart>
                </div>
            </>
            : null}

            {showMagnetic ? 
                <div className="SensorChart">
                <IsClosedChart data={logs}></IsClosedChart>
                </div>
            : null}

            {showMoisture ? 
                <div className="SensorChart">
                <MoistureChart data={logs}></MoistureChart>
                </div>
            : null}

            {showResistor ? 
                <div className="SensorChart">
                <ResistorChart data={logs}></ResistorChart>
                </div>
            : null}

        </div>
    )
}