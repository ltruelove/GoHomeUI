import React,{Component} from "react";
import axios from "axios";

class CreateView extends Component{
    constructor(props){
        super(props);

        this.state = {
            viewId: 0,
            viewName: ""
        };

        this.saveClicked = this.saveClicked.bind(this);
        this.handleName = this.handleName.bind(this);
    }

    handleName = event => {
        this.setState({ viewName: event.target.value });
    };

    saveClicked = event =>{
        let view = { "Name" : this.state.viewName };

        axios.post(process.env.REACT_APP_API_URL + '/view', view)
        .then(res=>{
            console.log(res);
            window.location = '/views';
        })
        .catch(err=>alert(err.response.data))
    }

    render(){
        return (
            <>
            <h2>Create A View</h2>
            <p>Name <input onChange={this.handleName} type="text" name="viewName" /></p>
            <button onClick={this.saveClicked}>Save</button>
            </>
        )
    }
}

export default CreateView;