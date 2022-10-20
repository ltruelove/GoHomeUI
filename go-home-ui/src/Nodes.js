import React,{Component} from "react";
import axios from "axios";
import { Link } from "react-router-dom";

class Nodes extends Component{
    constructor(props){
        super(props);
        this.state = {
            allNodes: []
        };
    }

    componentDidMount(){
        axios.get(process.env.REACT_APP_API_URL + '/node')
        .then(res=>{
            if(res.data){
                this.setState({allNodes: res.data ? res.data : []})
            }
        })
        .catch(err=>console.log(err))
    }

    render(){
        return (
            <>
            <h2>Nodes</h2>
            <ul>
                {this.state.allNodes.map((node) => (
                    <li key={node.Id}>
                        <Link className="App-link" to={`/node/${node.Id}`}>{node.Name}</Link>
                    </li>
                ))}
            </ul>
            </>
        )
    }
}

export default Nodes;