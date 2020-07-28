import React, {useEffect, useState} from "react"
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "../review.css";
import bgimage from '../photo-1.png';
import {useParams} from "react-router-dom";

export default function ViewEligibleProgicts()
{
    const[projects,setprojects]=useState([]);
    let {canvote} = useParams();
    useEffect(()=>{
        fetch("http://localhost:4000/approved-projects")
        .then(response => response.json())
        .then(json =>{
            if(json.status === 200)
            {
                setprojects(json.data);
            }
            else{
                alert(json.message);
            }
        })
    },[projects])
    return(
        <div>
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="/"><img src="https://www.service.nsw.gov.au/themes/snsw_theme/images/servicensw-logo.png" height="30" alt="React Bootstrap logo" /></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="/addProject">Submit an idea</Nav.Link>
                    <Nav.Link href="/viewProjects" >View Projects</Nav.Link>
                    </Nav>
                    <Form inline>
                    { canvote && <Button onClick={()=>{window.location.href="/reviewProjects"}}  variant="outline-success">Admin Login</Button> }
                    </Form>
                </Navbar.Collapse>
            </Navbar>
            <div class="jumbotron" style={{ backgroundImage: `url(${bgimage})`, backgroundSize:'cover',height:"500px" }}>
                <h1 style={{color:"white"}}>My Community Project</h1>
                <br></br>
                <p style={{color:"white"}}>       My Community Project is all about local ideas, local projects and local decisions.          </p>
                <br></br>
            </div>
            <div style={{display:"flex" , flexWrap:"wrap"}}>
                {projects && projects.map(p => <ViewProject p={p}/>)}
            </div>
        </div>
    );
};

function ViewProject(props)
{
    function sendVoteRequest(e)
    {
        e.preventDefault();
        fetch(`http://localhost:4000/approved-projects/${props.p.id}`,{
            method:"PUT",
            headers: { 'Content-Type': 'application/json' },
        })
        .then(response => response.json())
        .then(json =>{
            if(json.status === 200)
            {
                alert("you have voted");
            }
            else{
                alert(json.message);
            }
        })
    }
    return(
        <div>
            <Card style={{ width: '18rem', margin: "10px" }}>
                    <Card.Body>
                        <Card.Title><strong>Title: </strong>{props.p.details.title}</Card.Title>
                        <Card.Text className="mt-4">
                            <strong>Description: </strong>{props.p.details.description} 
                        </Card.Text>
                        <Card.Text  className="mt-4">
                            <strong>Status: </strong> {props.p.details.status}
                        </Card.Text>
                        <Card.Text>
                            <strong>Time updated: </strong> {props.p.timeUpdated}
                        </Card.Text>
                        <Card.Text>
                            <strong>Votes: </strong> {props.p.votes}
                        </Card.Text>
                        <Button variant="success" onClick={sendVoteRequest}>Vote</Button>
                    </Card.Body>
            </Card>
        </div>
    );
}