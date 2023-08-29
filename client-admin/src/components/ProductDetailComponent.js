import axios from 'axios';
import React, { Component } from 'react';
import MyContext from '../contexts/Mycontext';
import swal from 'sweetalert';

class ProductDetail extends Component {
  static contextType = MyContext; // using this.context to access global state
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      txtID: '',
      txtName: '',
      txtAuthor: '',
      txtPrice: 0,
      cmbCategory: 'choose',
      imgProduct: '',
    };
  }
  render() {
    const cates = this.state.categories.map((cate) => {
      if (this.props.item != null) {
        return (<option key={cate._id} value={cate._id} selected={cate._id === this.props.item.category._id}>{cate.name}</option>);
      } else {
        return (<option key={cate._id} value={cate._id}>{cate.name}</option>);
      }
    });
    return (
      <div className="float-left">
        <h3 className="text-center">PRODUCT DETAIL</h3>
        <div className='form-container'>
          <div className="image-container">
              <img src={this.state.imgProduct} width="400px" height="400px" alt="" />
          </div> 
          <form className='info-container'>
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
            <div className="form-group mb-2">
              <label>Author</label>
              <input
                type="text"
                value={this.state.txtAuthor}
                className="form-control"
                onChange={(e) => { this.setState({ txtAuthor: e.target.value }) }}
              />
            </div>
            <div className="form-group mb-2">
              <label>Price</label>
              <input
                type="text"
                value={this.state.txtPrice}
                className="form-control"
                onChange={(e) => { this.setState({ txtPrice: e.target.value }) }}
              />
            </div>
            <div class="mb-3">
              <label for="formFile" class="form-label">Image</label>
              <input 
                class="form-control" 
                type="file" 
                id="formFile"
                name="fileImage"
                accept="image/jpeg, image/png, image/gif"
                onChange={(e) => this.previewImage(e)}
              />
            </div>
            <div className="form-group mb-2">
                <label>Category</label>
                <select
                  className="form-control"
                  onChange={(e) => { this.setState({ cmbCategory: e.target.value }) }}
                >
                  <option>Choose</option>
                  {cates}
                </select>
            </div>
            <td>
              <input className='mr-3 mt-2 btn btn-primary' style={{margin: "10px 153px 0 0", width:"100px"}} type="submit" value="ADD" onClick={(e) => this.btnAddClick(e)} />
              <input className='mr-3 mt-2 btn btn-success' style={{margin: "10px 160px 0 0", width:"100px"}} type="submit" value="UPDATE" onClick={(e) => this.btnUpdateClick(e)} />
              <input className='mr-3 mt-2 btn btn-danger' style={{margin: "10px 0 0", width:"100px"}} type="submit" value="DELETE" onClick={(e) => this.btnDeleteClick(e)} />
            </td>
          </form>
        </div>   
      </div>
    );
  }
  componentDidMount() {
    this.apiGetCategories();
  }
  componentDidUpdate(prevProps) {
    if (this.props.item !== prevProps.item) {
      this.setState({
        txtID: this.props.item._id,
        txtName: this.props.item.name,
        txtAuthor: this.props.item.author,
        txtPrice: this.props.item.price,
        cmbCategory: this.props.item.category._id,
        imgProduct: 'data:image/jpg;base64,' + this.props.item.image
      });
    }
  }
  // event-handlers
  previewImage(e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (evt) => {
        this.setState({ imgProduct: evt.target.result });
      }
      reader.readAsDataURL(file);
    }
  }
  //Sự kiện thêm sản phẩm
  btnAddClick(e) {
    e.preventDefault();
    const name = this.state.txtName;
    const author = this.state.txtAuthor;
    const price = parseInt(this.state.txtPrice);
    const category = this.state.cmbCategory;
    const image = this.state.imgProduct.replace(/^data:image\/[a-z]+;base64,/, ''); // remove "data:image/...;base64,"
    if (name && author && price && category && image) {
      const prod = { name: name, author: author, price: price, category: category, image: image };
      this.apiPostProduct(prod);
    } else {
      //alert('Please input name and price and category and image');
      swal({
        title: "Please input name, price, category and image",
        icon: "warning",
        button: "OK",
      });
    }
  }
  //Sự kiện cập nhật sản phẩm
  btnUpdateClick(e) {
    e.preventDefault();
    const id = this.state.txtID;
    const name = this.state.txtName;
    const author = this.state.txtAuthor;
    const price = parseInt(this.state.txtPrice);
    const category = this.state.cmbCategory;
    const image = this.state.imgProduct.replace(/^data:image\/[a-z]+;base64,/, ''); // remove "data:image/...;base64,"
    if (id && name && author && price && category && image) {
      const prod = { name: name, author: author, price: price, category: category, image: image };
      this.apiPutProduct(id, prod);
    } else {
      //alert('Please input id and name and price and category and image');
      swal({
        title: "Please input id, name, price, category and image",
        icon: "warning",
        button: "OK",
      });
    }
  }
  //Sự kiện xóa sản phẩm
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
      if (willDelete) {
        const id = this.state.txtID;
        if (willDelete && id) {
          this.apiDeleteProduct(id);
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
  //Lấy danh mục
  apiGetCategories() {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.get('/api/admin/categories', config).then((res) => {
      const result = res.data;
      this.setState({ categories: result });
    });
  }
  //Thêm sản phẩm
  apiPostProduct(prod) {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.post('/api/admin/products', prod, config).then((res) => {
      const result = res.data;
      if (result) {
        swal("Added successfully!", {
          icon: "success",
        });
        this.apiGetProducts();
      } else {
        swal("Added failed", {
          icon: "error",
        });
      }
    });
  }
  //Lấy sản phẩm
  apiGetProducts() {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.get('/api/admin/products?page=' + this.props.curPage, config).then((res) => {
      const result = res.data;
      this.props.updateProducts(result.products, result.noPages);
      if (result.products.length !== 0) {
        this.props.updateProducts(result.products, result.noPages);
      } else {
        axios.get('/api/admin/products?page=' + (this.props.curPage - 1), config).then((res) => {
          const result = res.data;
          this.props.updateProducts(result.products, result.noPages);
        });
      }
    });
  }
  //Cập nhật sản phẩm
  apiPutProduct(id, prod) {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.put('/api/admin/products/' + id, prod, config).then((res) => {
      const result = res.data;
      if (result) {
        swal("Update successfully!", {
          icon: "success",
        });
        this.apiGetProducts();
      } else {
        swal("Update failed", {
          icon: "error",
        });
      }
    });
  }
  //Xóa sản phẩm
  apiDeleteProduct(id) {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.delete('/api/admin/products/' + id, config).then((res) => {
      const result = res.data;
      if (result) {
        swal("Deleted successfully!", {
          icon: "success",
        });
        this.apiGetProducts();
      } else {
        swal("Deleted failed", {
          icon: "error",
        });
      }
    });
  }
}
export default ProductDetail;