import axios from 'axios';
import React, { Component } from 'react';
import swal from 'sweetalert';
class Signup extends Component {
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
                pattern="[a-zA-Z0-9._%+-]+@gmail\.com"
                value={this.state.txtEmail} 
                onChange={(e) => { this.setState({ txtEmail: e.target.value }) }}
              />
              <div className="invalid-feedback">
                Please enter a valid Gmail address.
              </div>
            </div>
            <button
              type="submit"
              className="btn btn-primary mt-2 w-100"
              value="LOGIN" 
              onClick={(e) => this.btnSignupClick(e)}
            >
              SIGN UP
            </button>
          </form>
        </div>
      </div>
    );
  }
  // event-handlers
  btnSignupClick(e) {
    e.preventDefault();
    const username = this.state.txtUsername;
    const password = this.state.txtPassword;
    const name = this.state.txtName;
    const phone = this.state.txtPhone;
    const email = this.state.txtEmail;
    if (username && password && name && phone && email) {
      const account = { username: username, password: password, name: name, phone: phone, email: email };
      this.apiSignup(account);
    } else {
      swal({
        title: "Please input username, password, name, phone and email",
        icon: "warning",
        button: "OK",
      });
    }
  }
  // apis
  apiSignup(account) {
    axios.post('/api/customer/signup', account).then((res) => {
      const result = res.data;
      alert(result.message);
    });
  }
}
export default Signup;