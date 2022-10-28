import React,{useEffect, useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { ViewVM } from "../../Models/ViewVM";

const defaultViewData: ViewVM = {
    Id: 0,
    Name: "",
    sensors: [],
    switches: []
}

export default function ViewDetail(){
    const navigation = useNavigate();
    const [view, setView] = useState<ViewVM>(defaultViewData);

    let { id } = useParams();
    
    const fetchViewData = () => {
        axios.get(process.env.REACT_APP_API_URL + '/view/' + id)
        .then(res=>{
            if(res.data){
                if(res.data.sensors === null){
                    res.data.sensors = [];
                }
                if(res.data.switches === null){
                    res.data.switches = [];
                }
                setView(res.data);
            }
        })
        .catch(err=>console.log(err))
    }

    useEffect(() => {
        fetchViewData();
    }, []);

    return (
        <>
        <h2>{view.Name}</h2>
        <br />
        <Link className="App-link" to={`/view/edit/${id}`}>Edit</Link>
        <br />
        <h2>Sensors</h2>
        <br />
        <br />
        {view.sensors.map((sensor) => {
            return (
                <div key={sensor.Id}>{sensor.Name}</div>
            )
        })}

        <h2>Switches</h2>
        <br />
        <br />
        {view.switches.map((nodeSwitch) => (
            <div key={nodeSwitch.Id}>{nodeSwitch.Name}</div>
        ))}
        </>
    )
}