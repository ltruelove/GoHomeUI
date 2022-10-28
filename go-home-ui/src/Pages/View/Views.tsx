import React,{useEffect, useState} from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { View } from "../../Models/View";

export default function Views(){
    const [allViews, setAllViews] = useState<View[]>([]);

    const fetchAllViews = () => {
        axios.get(process.env.REACT_APP_API_URL + '/view')
        .then(res=>{
            if(res.data){
                setAllViews(res.data);
            }
        })
        .catch(err=>console.log(err))
    }

    useEffect(() => {
        fetchAllViews();
    }, []);

    const deleteClicked = (view: View) =>{
        console.log(view.Id);
        if(!window.confirm("Are you sure you want to delete this view?")){
            return;
        }

        axios.delete(process.env.REACT_APP_API_URL + '/view/' + view.Id)
        .then(() => fetchAllViews())
        .catch(err=>alert(err.response.data))
    }

    return (
        <>
        <h2>Views</h2>
        <Link className="App-link" to={`/view/create`}>Create New View</Link>
        <ul>
            {allViews.map((view) => (
                <li key={view.Id}>
                    <Link className="App-link" to={`/view/${view.Id}`}>{view.Name}</Link> &nbsp; <button onClick={() => {deleteClicked(view)}} >-</button>
                </li>
            ))}
        </ul>
        </>
    )
}