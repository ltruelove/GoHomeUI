import React,{useEffect, useState} from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import { View } from "./Models/View";
import { NodeVM } from "./Models/NodeVM";
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {LinkContainer} from 'react-router-bootstrap'

export default function SiteNav() {
    const [allViews, setAllViews] = useState<View[]>([]);
    const [allNodes, setAllNodes] = useState<NodeVM[]>([]);

    const fetchAllViews = () => {
        axios.get(process.env.REACT_APP_API_URL + '/view')
        .then(res=>{
            if(res.data){
                setAllViews(res.data);
            }
        })
        .catch(err=>console.log(err))
    }

    const fetchAllNodes = () => {
        axios.get(process.env.REACT_APP_API_URL + '/node')
        .then(res=>{
            if(res.data){
                setAllNodes(res.data? res.data : []);
            }
        })
        .catch(err=>console.log(err))
    }

    useEffect(() => {
        fetchAllViews();
        fetchAllNodes();
    }, []);

    return (
      <>
        <Nav fill variant="tabs" defaultActiveKey="/">
            <Nav.Item>
                <LinkContainer to="/">
                    <Nav.Link>Home</Nav.Link>
                </LinkContainer>
            </Nav.Item>
            <NavDropdown title="Nodes" id="nodes-dropdown">
                {allNodes.map((node) => (
                    <LinkContainer to={`/node/${node.Id}`} key={node.Id}>
                        <NavDropdown.Item>{node.Name}</NavDropdown.Item>
                    </LinkContainer>
                ))}
            </NavDropdown>
            <NavDropdown title="Views" id="nav-dropdown">
                {allViews.map((view) => (
                    <LinkContainer to={`/view/${view.Id}`} key={view.Id}>
                        <NavDropdown.Item>{view.Name}</NavDropdown.Item>
                    </LinkContainer>
                ))}
            </NavDropdown>
            <NavDropdown title="Settings" id="nodes-dropdown">
                <LinkContainer to="/controlPoints">
                    <NavDropdown.Item>Control Points</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/nodes">
                    <NavDropdown.Item>Nodes</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/views">
                    <NavDropdown.Item>Views</NavDropdown.Item>
                </LinkContainer>
            </NavDropdown>
        </Nav>
        </>
    );
}