import axios from 'axios';
import React, { Component } from 'react';
import swal from 'sweetalert';
import withRouter from '../utils/withRouter';
class Active extends Component {
  constructor(props) {
    super(props);
    this.state = {
      txtID: '',
      txtToken: ''
    };
  }
  render() {
    return (
      // <div className="align-center">
      //   <h2 className="text-center">ACTIVE ACCOUNT</h2>
      //   <form>
      //     <table className="align-center">
      //       <tbody>
      //         <tr>
      //           <td>ID</td>
      //           <td><input type="text" value={this.state.txtID} onChange={(e) => { this.setState({ txtID: e.target.value }) }} /></td>
      //         </tr>
      //         <tr>
      //           <td>Token</td>
      //           <td><input type="text" value={this.state.txtToken} onChange={(e) => { this.setState({ txtToken: e.target.value }) }} /></td>
      //         </tr>
      //         <tr>
      //           <td></td>
      //           <td><input type="submit" value="ACTIVE" onClick={(e) => this.btnActiveClick(e)} /></td>
                
      //         </tr>
      //       </tbody>
      //     </table>
      //   </form>
      // </div>
      <div className="wrapper bg-opacity-10 d-flex align-items-center justify-content-center w-100" style={{ height: '70vh' }}>
        <div className="login-container">
          <h2 className='mb-3 text-center' style={{ fontSize: '20px' }}>ACTIVE</h2>
          <form>
            <div className="form-group was-validated mb-2">
              <label>ID</label>
              <input
                type="text"
                className="form-control" required
                value={this.state.txtID}
                onChange={(e) => { this.setState({ txtID: e.target.value }) }}
              />
            </div>
            <div className="form-group was-validated mb-2">
              <label>Token</label>
              <input
                type="password"
                className="form-control" required
                value={this.state.txtToken} onChange={(e) => { this.setState({ txtToken: e.target.value }) }}
              />
            </div>
            <button
              type="submit"
              className="btn btn-success mt-2 w-100"
              value="ACTIVE" onClick={(e) => this.btnActiveClick(e)}
            >
              ACTIVE
            </button>
          </form>
        </div>
      </div>
    );
  }
  // event-handlers
  btnActiveClick(e) {
    e.preventDefault();
    const id = this.state.txtID;
    const token = this.state.txtToken;
    if (id && token) {
      this.apiActive(id, token);
      //<Link to='/login' className='non'>Login</Link> ??????????????????
    } else {
      //alert('Please input id and token');
      swal({
        title: "Please input id and token",
        icon: "warning",
        button: "OK",
      });
    }
  }
  // apis
  apiActive(id, token) {
    const body = { id: id, token: token };
    axios.post('/api/customer/active', body).then((res) => {
      const result = res.data;
      if (result) {
        //alert("Active successfully!");
        swal({
          title: "Active successfully!",
          icon: "success",
          button: "OK",
        }).then(() => {
          this.props.navigate('/login');
        });
      } else {
        //alert("Active failed!");
        swal({
          title: "Active failed!",
          icon: "warning",
          button: "OK",
        });
      }
    });
  }
}
export default withRouter(Active);