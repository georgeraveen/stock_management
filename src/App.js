import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router,Switch,Route,Link} from 'react-router-dom';

import {Navbar} from 'react-bootstrap';
import {Nav} from 'react-bootstrap';
import {NavDropdown} from 'react-bootstrap';

function App() {
  return (
    <Router>
    
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand href="#home">Pharmacy</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#features">Home</Nav.Link>
            
            <NavDropdown title="Products" id="collasible-nav-dropdown">
              <NavDropdown.Item href="#action/3.2">Add new product</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Add new batch No</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">View products</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Stock management" id="collasible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">View stock</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.2">Add GRN</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Stock return</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">Stock adjustment</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
            <Nav.Link href="#deets">More deets</Nav.Link>
            <Nav.Link eventKey={2} href="#memes">
              Dank memes
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <br/>
      <h2>Welcome</h2><br/>
      <Switch>
        {/* <Route exact path='/create' component={Create}/>
        <Route exact path='/edit/:id' component={Edit}/>
        <Route exact path='/index' component={Index}/> */}
      </Switch>
    
  </Router>
  

  );
}

export default App;
