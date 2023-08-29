import axios from 'axios';
import React, { Component } from 'react';
import MyContext from '../contexts/Mycontext';
import ProductDetail from './ProductDetailComponent';

class Product extends Component {
  static contextType = MyContext; // using this.context to access global state
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      noPages: 0,
      curPage: 1,
      itemSelected: null
    };
  }
  render() {
    const prods = this.state.products.map((item) => {
      return (
        <tr key={item._id} className="datatable" onClick={() => this.trItemClick(item)}>
          <td>{item._id}</td>
          <td>{item.name}</td>
          <td>{item.author}</td>
          <td>{item.price}</td>
          <td>{new Date(item.cdate).toLocaleString()}</td>
          <td>{item.category.name}</td>
          <td><img src={"data:image/jpg;base64," + item.image} width="100px" height="100px" alt="" /></td>
        </tr>
      );
    });
    const pagination = Array.from({ length: this.state.noPages }, (_, index) => {
      if ((index + 1) === this.state.curPage) {
        return (
          <li class="page-item" key={index}>
            <button class="page-link" onClick={() => this.lnkPageClick(index + 1)}>
              <b>{index + 1}</b>
            </button>
          </li>
        );
      } else {
        return (
          // <span key={index} className="link" onClick={() => this.lnkPageClick(index + 1)}>
          //   | {index + 1} |
          // </span>
          <li class="page-item" key={index}>
            <button class="page-link" onClick={() => this.lnkPageClick(index + 1)}>
              {index + 1}
            </button>
          </li>
        );
      }
    });
    return (
      <div className="container">
        <div className="container row mt-5">
          <h2 className="text-center">PRODUCT LIST</h2>
          <table className="table table-bordered">
            <thead className="thead-dark datatable ">
              <tr className='datatable'>
                <th>ID</th>
                <th>Name</th>
                {/* add author */}
                <th>Author</th>
                <th>Price</th>
                <th>Creation date</th>
                <th>Category</th>
                <th>Image</th>
              </tr>
            </thead>
            <tbody style={{cursor: 'pointer'}}>{prods}</tbody>
          </table>
          <tr>
            <nav aria-label="Page navigation example">
              <ul class="pagination justify-content-center">
                {pagination}
              </ul>
            </nav>
          </tr> 
        </div>
        <div className="container row mt-1">
          <ProductDetail item={this.state.itemSelected} curPage={this.state.curPage} updateProducts={this.updateProducts} />
        </div>
      </div>
    );
  }
  updateProducts = (products, noPages) => { // arrow-function
    this.setState({ products: products, noPages: noPages });
  }
  componentDidMount() {
    this.apiGetProducts(this.state.curPage);
  }
  // event-handlers
  lnkPageClick(index) {
    this.apiGetProducts(index);
  }
  trItemClick(item) {
    this.setState({ itemSelected: item });
  }
  // apis
  apiGetProducts(page) {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.get('/api/admin/products?page=' + page, config).then((res) => {
      const result = res.data;
      this.setState({ products: result.products, noPages: result.noPages, curPage: result.curPage });
    });
  }
}
export default Product;