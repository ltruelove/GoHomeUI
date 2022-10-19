import React,{Component} from "react";
import axios from "axios";
import { Link } from "react-router-dom";

class ControlPoints extends Component{
    constructor(props){
        super(props);
        this.state = {
            allPoints: []
        };
    }

    componentDidMount(){
        axios.get(process.env.REACT_APP_API_URL + '/controlPoint')
        .then(res=>{
            console.log(res.data);
            if(res.data){
                this.setState({allPoints: res.data})
            }
        })
        .catch(err=>console.log(err))
    }

    render(){
        return (
            <>
            <h3>Control Points</h3>
            <ul>
                {this.state.allPoints.map((point) => (
                    <li key={point.Id}>
                        <Link className="App-link" to={`/controlPoint/${point.Id}`}>{point.Name}</Link>
                    </li>
                ))}
            </ul>
            </>
        )
    }
}

export default ControlPoints;