import React,{useEffect, useState} from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function EditView(){
    const [name, setName] = useState('');

    let { id } = useParams();

    const saveClicked = event =>{
        let view = {
            "Id" : parseInt(id),
            "Name" : name
        };

        axios.put(process.env.REACT_APP_API_URL + '/view', view)
        .then(res=>{
            console.log(res);
            window.location = '/views';
        })
        .catch(err=>alert(err.response.data))
    }

    useEffect(() => {
        axios.get(process.env.REACT_APP_API_URL + '/view/' + id)
        .then(res=>{
            console.log(res);
            if(res.data && res.data.Name){
                setTimeout(() => {
                    setName(res.data.Name);
                }, 20);
            }
        })
        .catch(err=>console.log(err))
    }, []);

    return (
        <>
        <h2>Edit View</h2>
        <p>Name <input
            type="text"
            value={name}
            onChange={event => setName(event.target.value)}
        /></p>
        <button onClick={saveClicked}>Save</button>
        </>
    )
}