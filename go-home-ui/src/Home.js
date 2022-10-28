import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
    return(
        <>
        <div className="App">
            <div className="App-header">
                <h3>Welcome To The GoHome UI</h3>
                <p>Manage your GoHome API from here.</p>
                <Link className="App-link" to="/controlPoints">Control Points</Link>
                <Link className="App-link" to="/nodes">Nodes</Link>
                <Link className="App-link" to="/Views">Views</Link>
            </div>
            </div>
        </>
    )
}