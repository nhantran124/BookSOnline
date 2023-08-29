import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import withRouter from '../utils/withRouter';
import MyContext from '../contexts/MyContext';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

class Menu extends Component {
  static contextType = MyContext;
  constructor(props) {
    super(props);
    this.state = {
      txtKeyword: '',
    };
  }
  render() {
    return (
      <Navbar expand="lg" className="">
        <Container>
          <Navbar.Brand as={Link} to="/">
            <img
              alt=""
              src="https://img.freepik.com/free-vector/hand-drawn-flat-design-stack-books_23-2149342941.jpg?w=2000"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{' '}
            BookSonline
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto"></Nav> {/* khoảng trống*/}
            <Form className="d-flex align-middle object-fit-contain">
              <Form.Control
                type="search"
                placeholder="Search"
                className="keyword me-2 flex-grow-2" value={this.state.txtKeyword} onChange={(e) => { this.setState({ txtKeyword: e.target.value }) }}
                aria-label="Search"
                />
              <Button type="submit" value="SEARCH" variant="outline-success" onClick={(e) => this.btnSearchClick(e)}>Search</Button>
            </Form>
            <Nav className="me-auto"></Nav> {/* khoảng trống*/}
            <Nav className="float-right">
              {this.context.token === '' ?
                <Nav.Item>
                  <Link to='/login' className='non'>Login</Link> | <Link to='/signup' className='non'>Sign-up</Link>
                </Nav.Item>
                :
                <NavDropdown title={this.context.customer.name} id="basic-nav-dropdown">
                  <NavDropdown.Item><Link to='/myprofile' className='non'>My profile</Link></NavDropdown.Item>
                  <NavDropdown.Item><Link to='/myorders' className='non'>My orders</Link></NavDropdown.Item>
                  <NavDropdown.Item><Link to='/home' className='non' onClick={() => this.lnkLogoutClick()}>Logout</Link></NavDropdown.Item>
                </NavDropdown>
              }
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
  // event-handlers
  btnSearchClick(e) {
    e.preventDefault();
    const keyword = this.state.txtKeyword.trim();
    if (keyword !== '') {
      this.props.navigate('/product/search/' + this.state.txtKeyword);
    } else {
      //not found return to home page
      this.props.navigate('/home');
      //maybe show a message "not found"
    }
  }
  
  lnkLogoutClick() {
    this.context.setToken('');
    this.context.setCustomer(null);
    this.context.setMycart([]);
  }

  componentDidMount() {
    this.apiGetCategories();
  }
  // apis
  apiGetCategories() {
    axios.get('/api/customer/categories').then((res) => {
      const result = res.data;
      this.setState({ categories: result });
    });
  }
}
export default withRouter(Menu);