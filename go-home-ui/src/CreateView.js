import React,{useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function CreateView(props){
    const navigate = useNavigate();
    const [viewName, setViewName] = useState("");

    const nameChanged = (event) => {
        setViewName(event.target.value);
    }

    const saveClicked = (event) => {
        let view = { "Name" : viewName };

        axios.post(process.env.REACT_APP_API_URL + '/view', view)
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