import React,{useState , useEffect} from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import FormControl from "react-bootstrap/FormControl";
import Card from "react-bootstrap/Card";
import bgimage from '../photo-2.png';
import "../review.css";


export default function ProcessProject()
{
    const[view,setview]=useState(0);
    const [searchItem,setSearchItem]=useState("");
    const [status,setStatus]=useState("Pendding");
    const[canvote,setcanvote]=useState(true);
    const views=[<Pendding searchItem={searchItem} canvote={canvote}/>,<Approved searchItem={searchItem}/>,<Rejected searchItem={searchItem}/>];
    return(
        <div>
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="/"><img src="https://www.service.nsw.gov.au/themes/snsw_theme/images/servicensw-logo.png" height="30" alt="React Bootstrap logo" /></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="/addProject">Submit an idea</Nav.Link>
                    <Nav.Link href= {`/viewProjects/${canvote}`} >View Projects</Nav.Link>
                    </Nav>
                    <Form inline>
                    <Button onClick={()=>{window.location.href="/reviewProjects"}} variant="outline-success">Admin Login</Button>
                    </Form>
                </Navbar.Collapse>
            </Navbar>
            <div class="jumbotron" style={{ backgroundImage: `url(${bgimage})`, backgroundSize:'cover',height:"500px" }}>
                <h1>My Community Project</h1>
                <br></br>
                <p>       My Community Project is all about local ideas, local projects and local decisions.          </p>
                <br></br>
            </div>
            <div className="checked-box">
                <Form>
                    <Form.Check
                        type="switch"
                        id="custom-switch"
                        label="Public Can Vote"
                        checked={canvote}
                        onClick={(e)=>{(canvote)?setcanvote(false):setcanvote(true)}}
                    />
                </Form>
                <p>{canvote && "hello"}</p>
            </div>
            <InputGroup className="mb-3">
                <DropdownButton
                    as={InputGroup.Prepend}
                    variant="outline-secondary"
                    title={status}
                    id="input-group-dropdown-1"
                    >
                    <Dropdown.Item active={status === "Rejected"} onClick={()=>{setview(2); setStatus("Rejected");}}>Rejected</Dropdown.Item>
                    <Dropdown.Item active={status === "Approved"} onClick={()=>{setview(1); setStatus("Approved");}}>Approved</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item active={status === "Pending"} onClick={()=>{setview(0); setStatus("Pendding");}}>Pendding</Dropdown.Item>
                </DropdownButton>
                <FormControl onChange={(e)=>{setSearchItem(e.target.value)}} aria-describedby="basic-addon1" placeholder="Search" />
            </InputGroup>
            {views[view]}
        </div>
    );
}

function Pendding(props)
{
    const searchTerm= props.searchItem;
    const [projects,setprojects]=useState([]);
    let canvote = props.canvote;
    useEffect(()=>{
        fetch("http://localhost:4000/projects/pendding",{
            method:"POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({searchTerm})
        })
        .then(response => response.json())
        .then(json =>{
            if(json.status === 200)
            {
                setprojects(json.data);
            }else{
                alert(json.message);
            }
        })
    },[searchTerm])

    function sendApproveRequest(id)
    {
        
        fetch("http://localhost:4000/projects",{
            method:"PUT",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({id,status:"approved"})
        })
        .then(response => response.json())
        .then(json =>{
            if(json.status === 200)
            {
                alert("this project has been approved");
                window.location.href=`/viewProjects/${canvote}`;
            }else{
                alert(json.message);
            }
        })

    }
    function sendRejectRequest(id)
    {
    
        fetch("http://localhost:4000/projects",{
            method:"PUT",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({id,status:"rejected"})
        })
        .then(response => response.json())
        .then(json =>{
            if(json.status === 200)
            {
                alert("this project has been rejected");
            }else{
                alert(json.message);
            }
        })

    }
    return(
        <div className="review-projects-disply">
            {projects && projects.map(p =>{
                return(
                <div>
                    <Card style={{ width: '18rem', margin: "10px" }}>
                        <Card.Body>
                            <Card.Title><strong>Title: </strong>{p.value.title}</Card.Title>
                            <Card.Text className="mt-4">
                                <strong>Description: </strong>{p.value.description} 
                            </Card.Text>
                            <Card.Text  className="mt-4">
                                <strong>Status: </strong> {p.value.status}
                            </Card.Text>
                            <Button onClick={()=>{sendApproveRequest(p.id);}} variant="primary">approve</Button>
                            <Button onClick={()=>{sendRejectRequest(p.id);}} className="ml-4"  variant="primary">reject</Button>
                        </Card.Body>
                    </Card>
                </div>
                );
            })}
        </div>
    );
}

function Approved(props)
{
    const searchTerm= props.searchItem;
    const [projects,setprojects]=useState([]);
    useEffect(()=>{
        fetch("http://localhost:4000/projects/approved",{
            method:"POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({searchTerm})
        })
        .then(response => response.json())
        .then(json =>{
            if(json.status === 200)
            {
                setprojects(json.data);
            }else{
                alert(json.message);
            }
        })
    },[searchTerm]);
    return(
        <div className="review-projects-disply">
            {projects && projects.map(p =>{
                return(
                <Card style={{ width: '18rem', margin: "10px" }}>
                    <Card.Body>
                        <Card.Title><strong>Title: </strong>{p.value.title}</Card.Title>
                        <Card.Text className="mt-4">
                            <strong>Description: </strong>{p.value.description} 
                        </Card.Text>
                        <Card.Text  className="mt-4">
                            <strong>Status: </strong> {p.value.status}
                        </Card.Text>
                    </Card.Body>
                </Card>
                );
            })}
        </div>
    );
}

function Rejected(props)
{
    const searchTerm= props.searchItem;
    const [projects,setprojects]=useState([]);
    useEffect(()=>{
        fetch("http://localhost:4000/projects/rejected",{
            method:"POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({searchTerm})
        })
        .then(response => response.json())
        .then(json =>{
            if(json.status === 200)
            {
                setprojects(json.data);
            }else{
                alert(json.message);
            }
        })
    },[searchTerm]);
    return(
        <div className="review-projects-disply">
            {projects && projects.map(p =>{
                return(
                <Card style={{ width: '18rem', margin: "10px" }}>
                    <Card.Body>
                        <Card.Title><strong>Title: </strong>{p.value.title}</Card.Title>
                        <Card.Text className="mt-4">
                            <strong>Description: </strong>{p.value.description} 
                        </Card.Text>
                        <Card.Text  className="mt-4">
                            <strong>Status: </strong> {p.value.status}
                        </Card.Text>
                    </Card.Body>
                </Card>
                );
            })}
        </div>
    );
}