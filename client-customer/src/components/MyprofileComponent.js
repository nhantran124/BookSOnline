import axios from 'axios';
import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';
import MyContext from '../contexts/MyContext';
import swal from 'sweetalert';
class Myprofile extends Component {
  static contextType = MyContext; // using this.context to access global state
  constructor(props) {
    super(props);
    this.state = {
      txtUsername: '',
      txtPassword: '',
      txtName: '',
      txtPhone: '',
      txtEmail: ''
    };
  }
  render() {
    if (this.context.token === '') return (<Navigate replace to='/login' />);
    return (
      <div className="wrapper bg-opacity-10 d-flex align-items-center justify-content-center w-100" style={{ height: '70vh' }}>
        <div className="login-container">
          <h2 className='mb-3 text-center' style={{ fontSize: '20px' }}>SIGN UP</h2>
          <form>
            <div className="form-group was-validated mb-2">
              <label>Username</label>
              <input
                type="text"
                className="form-control" required
                value={this.state.txtUsername}
                onChange={(e) => { this.setState({ txtUsername: e.target.value }) }}
              />
            </div>
            <div className="form-group was-validated mb-2">
              <label>Password</label>
              <input
                type="password"
                className="form-control" required
                value={this.state.txtPassword} 
                onChange={(e) => { this.setState({ txtPassword: e.target.value }) }}
              />
            </div>
            <div className="form-group was-validated mb-2">
              <label>Name</label>
              <input
                type="text"
                className="form-control" required
                value={this.state.txtName} 
                onChange={(e) => { this.setState({ txtName: e.target.value }) }}
              />
            </div>
            <div className="form-group was-validated mb-2">
              <label>Phone</label>
              <input
                type="text"
                className="form-control" required
                value={this.state.txtPhone} 
                onChange={(e) => { this.setState({ txtPhone: e.target.value }) }}
              />
            </div>
            <div className="form-group was-validated mb-2">
              <label>Email</label>
              <input
                type="text"
                className="form-control" required
                value={this.state.txtEmail} 
                onChange={(e) => { this.setState({ txtEmail: e.target.value }) }}
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary mt-2 w-100"
              value="LOGIN" 
              onClick={(e) => this.btnUpdateClick(e)}
            >
              Update
            </button>
          </form>
        </div>
      </div>
    );
  }
  componentDidMount() {
    if (this.context.customer) {
      this.setState({
        txtUsername: this.context.customer.username,
        txtPassword: this.context.customer.password,
        txtName: this.context.customer.name,
        txtPhone: this.context.customer.phone,
        txtEmail: this.context.customer.email
      });
    }
  }
  // event-handlers
  btnUpdateClick(e) {
    e.preventDefault();
    const username = this.state.txtUsername;
    const password = this.state.txtPassword;
    const name = this.state.txtName;
    const phone = this.state.txtPhone;
    const email = this.state.txtEmail;
    if (username && password && name && phone && email) {
      const customer = { username: username, password: password, name: name, phone: phone, email: email };
      this.apiPutCustomer(this.context.customer._id, customer);
    } else {
      swal({
        title: "Please input username, password, name, phone and email",
        icon: "warning",
        button: "OK",
      });
    }
  }
  // apis
  apiPutCustomer(id, customer) {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.put('/api/customer/customers/' + id, customer, config).then((res) => {
      const result = res.data;
      if (result) {
        swal({
          title: "Updated successfully",
          icon: "success",
          button: "OK",
        });
        this.context.setCustomer(result);
      } else {
        swal({
          title: "Update failed",
          icon: "error",
          button: "OK",
        });
      }
    });
  }
}
export default Myprofile;