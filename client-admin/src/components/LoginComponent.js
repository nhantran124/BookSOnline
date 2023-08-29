import axios from 'axios';
import React, { Component } from 'react';
import MyContext from '../contexts/Mycontext';
import 'bootstrap/dist/css/bootstrap.min.css';
import swal from 'sweetalert';

class Login extends Component {
  static contextType = MyContext; // using this.context to access global state
  constructor(props) {
    super(props);
    this.state = {
      txtUsername: '',
      txtPassword: ''
    };
  }
  render() {
    if (this.context.token === '') {
      return (
        <div className="wrapper bg-dark bg-opacity-10 d-flex align-items-center justify-content-center w-100" style={{ height: '100vh' }}>
          <div className="login-container">
            <h2 className='mb-3 text-center' style={{ fontSize: '20px' }}>ADMIN LOGIN</h2>
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
                  value={this.state.txtPassword} onChange={(e) => { this.setState({ txtPassword: e.target.value }) }}
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary mt-2 w-100"
                value="LOGIN" onClick={(e) => this.btnLoginClick(e)}
              >
                LOGIN
              </button>

            </form>
          </div>
        </div>
      );
    }
    return (<div />);
  }
  // event-handlers
  btnLoginClick(e) {
    e.preventDefault();
    const username = this.state.txtUsername;
    const password = this.state.txtPassword;
    if (username && password) {
      const account = { username: username, password: password };
      this.apiLogin(account);
    } else {
      //alert('Please input username and password');
      swal({
        title: "Please input username and password",
        icon: "warning",
        button: "OK",
      });
    }
  }
  // apis
  apiLogin(account) {
    axios.post('/api/admin/login', account).then((res) => {
      const result = res.data;
      if (result.success === true) {
        this.context.setToken(result.token);
        this.context.setUsername(account.username);
      } else {
        //alert(result.message);
        swal({
          title: "Username and password incorrect",
          icon: "warning",
          button: "OK",
        });
      }
    });
  }
}
export default Login;