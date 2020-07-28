import React from 'react';

import Button from "react-bootstrap/Button"
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Form from 'react-bootstrap/Form';
import bgimage from '../carousel2.jpg';

export default function Main(){
    return(
        <div>
            <Navbar bg="light" expand="lg">
          <Navbar.Brand href="/"><img src="https://www.service.nsw.gov.au/themes/snsw_theme/images/servicensw-logo.png" height="30" alt="React Bootstrap logo" /></Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="/addProject" >Submit an idea</Nav.Link>
                    <Nav.Link href="/viewProjects" >View Projects</Nav.Link>
                </Nav>
            <Form inline>
              <Button onClick={()=>{window.location.href="/reviewProjects"}} variant="outline-success">Admin Login</Button>
            </Form>
                </Navbar.Collapse>
            </Navbar>
            {/* <Carousel>
                <image src={image1} width="1440" height="480" alt="first image"/>
                <Carousel.Item>
                    <image src="../photo-1.png" width="1440" height="480" alt="first image"/>
                    <Carousel.Caption>
                        <h3>Service NSW community projects</h3>
                        <p>Each year the NSW government provides funding through the NSW Generations Fund for projects in the local community.  </p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <image src="https://images.unsplash.com/photo-1532984969226-95057604f683?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2182&q=80" width="1440" height="480" alt="first image"/>
                <Carousel.Caption>
                <h3>View Projects in your Community</h3>
                <p> Submissions for projects are welcomed from people in local NSW communities.</p>
                </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                <image src="https://images.unsplash.com/photo-1563962971357-aa36cbe82110?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2689&q=80" width="1440" height="480" alt="first image"/>
                <Carousel.Caption>
                <h3>Vote for your Community</h3>
                <p>Each submission then competes alongside other eligible projects for funding. </p>
                </Carousel.Caption>
                </Carousel.Item>
            </Carousel> */}
            <div class="jumbotron" style={{ backgroundImage: `url(${bgimage})`, backgroundSize:'cover',height:"500px" }}>
                <h1>My Community Project</h1>
                <br></br>
                <p>       My Community Project is all about local ideas, local projects and local decisions.          </p>
                <br></br>
            </div>
            <div className="contect">
                <h3 className="text-primary">Latest Successful projects</h3>
                <p>Find out about other current our Community projects and plans. These plans and projects are being developed to improve and enhance activities and facilities in NSW.
                These plans consist of a mix NSW owned projects and projects where The service is partnering with the NSW Government. The All of Government Communications Framework 
                encapsulates our commitment to work together across government so that we can deliver first class communications to NSW citizens. This can be achieved by putting our customers at the centre of our 
                communications. The Framework defines our way of working to improve the effectiveness and impact of our communications through three strategic pillars.</p>
                <p>The All of Government Communications Framework encapsulates our commitment to work together across government so that we can deliver first class communications
                 to NSW citizens. This can be achieved by putting our customers at the centre of our communications. The Framework defines our way of working to improve the effectiveness
                and impact of our communications through three strategic pillars.</p>
            </div>
            <div className="option">
                <button type="button" onClick={()=>{window.location.href="/addProject"}} class="btn btn-danger">Add Project</button>
            </div>
            <div className="option">
                <button type="button" onClick={()=>{window.location.href="/viewProjects"}} class="btn btn-danger">View Projects</button>
            </div>
        </div>
    );
}
