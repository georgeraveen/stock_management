import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';

import {Navbar} from 'react-bootstrap';
import {Nav} from 'react-bootstrap';
import {NavDropdown} from 'react-bootstrap';


import AddNewProduct from './components/products/newProduct/newProduct';
import AddNewBatch from './components/products/newBatch/newBatch';
import ViewProducts from './components/products/viewProducts/viewProduct';

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
              <NavDropdown.Item href="/products/AddNewProduct">Add new product</NavDropdown.Item>
              <NavDropdown.Item href="/products/AddNewBatch">Add new batch No</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/products/ViewProducts">View products</NavDropdown.Item>
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
      <div  className="container">
      <h2>Welcome</h2>
      </div><br/>
      <Switch>
        
         <Route exact path='/products/AddNewProduct' component={AddNewProduct}/>
         <Route exact path='/products/AddNewBatch' component={AddNewBatch}/>
         <Route exact path='/products/ViewProducts' component={ViewProducts}/>
        {/* <Route exact path='/edit/:id' component={Edit}/> */}
        {/* <Route exact path='/index' component={Index}/>  */}
        
      </Switch>
    
  </Router>
  

  );
}

export default App;
