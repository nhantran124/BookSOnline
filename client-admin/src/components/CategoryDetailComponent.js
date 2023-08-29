//import axios from 'axios';
import React, { Component } from 'react';
import MyContext from '../contexts/Mycontext';
import axios from 'axios';
import swal from 'sweetalert';
class CategoryDetail extends Component {
  static contextType = MyContext; // using this.context to access global state
  constructor(props) {
    super(props);
    this.state = {
      txtID: '',
      txtName: ''
    };
  }
  render() {
    return (
      <div className="text-center">
        <h2 className="text-center">CATEGORY DETAIL</h2>
        {/* <form className='container align-center'>
          <table>
            <tbody>
              <tr>
                <td>ID</td>
                <td><input type="text" value={this.state.txtID} onChange={(e) => { this.setState({ txtID: e.target.value }) }} readOnly={true} /></td>
              </tr>
              <tr>
                <td>Name</td>
                <td><input type="text" value={this.state.txtName} onChange={(e) => { this.setState({ txtName: e.target.value }) }} /></td>
              </tr>
              <tr>
                <td></td>
                <td>
                  <input type="submit" value="ADD" onClick={(e) => this.btnAddClick(e)} />
                  <input type="submit" value="UPDATE" onClick={(e) => this.btnUpdateClick(e)} />
                  <input type="submit" value="DELETE" onClick={(e) => this.btnDeleteClick(e)} />
                </td>
              </tr>
            </tbody>
          </table>
        </form> */}
        <form>
          <div className="form-group mb-2">
            <label>ID</label>
              <input
                type="text"
                value={this.state.txtID}
                className="form-control"
                onChange={(e) => { this.setState({ txtID: e.target.value }) }}
                readOnly={true}
              />
          </div>
          <div className="form-group mb-2">
             <label>Name</label>
             <input
                type="text"    
                value={this.state.txtName}
                className="form-control"
                onChange={(e) => { this.setState({ txtName: e.target.value }) }}
              />
          </div>
          <td>
            <input className='mr-3 mt-2 btn btn-primary' style={{margin: "10px 130px 0 0", width:"100px"}} type="submit" value="ADD" onClick={(e) => this.btnAddClick(e)} />
            <input className='mr-3 mt-2 btn btn-success' style={{margin: "10px 118px 0 0", width:"100px"}} type="submit" value="UPDATE" onClick={(e) => this.btnUpdateClick(e)} />
            <input className='mr-3 mt-2 btn btn-danger' style={{margin: "10px 0 0", width:"100px"}} type="submit" value="DELETE" onClick={(e) => this.btnDeleteClick(e)} />
          </td>
        </form>
      </div>
    );
  }
  componentDidUpdate(prevProps) {
    if (this.props.item !== prevProps.item) {
      this.setState({ txtID: this.props.item._id, txtName: this.props.item.name });
    }
  }
  // event-handlers
//Sự kiện thêm danh mục
  btnAddClick(e) {
    e.preventDefault();
    const name = this.state.txtName;
    if (name) {
      const cate = { name: name };
      this.apiPostCategory(cate);
      this.setState({ txtID: '', txtName: '' });
    } else {
      swal({
        title: "Please input name",
        icon: "warning",
        button: "OK",
      });
    }
  }
  //Sự kiện cập nhật danh mục
  btnUpdateClick(e) {
    e.preventDefault();
    const id = this.state.txtID;
    const name = this.state.txtName;
    if (id && name) {
      const cate = { name: name };
      this.apiPutCategory(id, cate);
    } else {
      swal({
        title: "Please input id and name",
        icon: "warning",
        button: "OK",
      });
    }
  }
  //Sự kiện xoá danh mục
  btnDeleteClick(e) {
    e.preventDefault();
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      const id = this.state.txtID;
      if (willDelete) {
        if (id) {
          this.apiDeleteCategory(id);
          this.setState({ txtID: '', txtName: '' });
        } else {
          swal({
            title: "Please input id",
            icon: "warning",
            button: "OK",
          });
        }
      }
    });
  }
  // apis
  //Thêm danh mục
  apiPostCategory(cate) {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.post('/api/admin/categories', cate, config).then((res) => {
      const result = res.data;
      if (result) {
        swal("Added successfully!", {
          icon: "success",
        });
        this.apiGetCategories();
      } else {
        swal("Added failed", {
          icon: "error",
        });
      }
    });
  }
  //Lấy danh mục
  apiGetCategories() {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.get('/api/admin/categories', config).then((res) => {
      const result = res.data;
      this.props.updateCategories(result);
    });
  }
  //Cập nhật danh mục
  apiPutCategory(id, cate) {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.put('/api/admin/categories/' + id, cate, config).then((res) => {
      const result = res.data;
      if (result) {
        swal("Update successfully!", {
          icon: "success",
        });
        this.apiGetCategories();
      } else {
        swal("Update failed", {
          icon: "error",
        });
      }
    });
  }
  //Xoá danh mục
  apiDeleteCategory(id) {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.delete('/api/admin/categories/' + id, config).then((res) => {
      const result = res.data;
      if (result) {
        swal("Deleted successfully!", {
          icon: "success",
        });
        this.apiGetCategories();
      } else {
        swal("Deleted failed", {
          icon: "error",
        });
      }
    });
  }
}
export default CategoryDetail;