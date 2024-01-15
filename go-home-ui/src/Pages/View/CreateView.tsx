import React,{useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { View } from "../../Models/View";
// @ts-ignore
import apiUrl from "../../index.tsx";

export default function CreateView(props){
    const navigate = useNavigate();
    const [view, setView] = useState<View>({ Id: 0, Name: ""});

    const nameChanged = (event) => {
        setView({...view, Name: event.target.value});
    }

    const saveClicked = () => {
        axios.post(apiUrl + '/view', view)
        .then(res=>{
            navigate("/views");
        })
        .catch(err=>alert(err.response.data))
    }

    return (
        <>
        <h2>Create A View</h2>
        <p>Name <input onChange={nameChanged} type="text" name="viewName" /></p>
        <button onClick={saveClicked}>Save</button>
        </>
    )
}