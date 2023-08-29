import axios from 'axios';
import React, { Component } from 'react';
import MyContext from '../contexts/Mycontext';
import CategoryDetail from './CategoryDetailComponent';

class Category extends Component {
  static contextType = MyContext; // using this.context to access global state
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      itemSelected: null
    };
  }
  render() {
    const cates = this.state.categories.map((item) => {
      return (
        <tr key={item._id} className="datatable" onClick={() => this.trItemClick(item)}>
          <td>{item._id}</td>
          <td>{item.name}</td>
        </tr>
      );
    });
    return (
      <div className="container">
        <div className="container row mt-5">
          <h2 className="text-center">CATEGORY LIST</h2>
          <table className="table table-bordered">
            <thead className="thead-dark datatable ">
              <tr className='datatable'>
                <th>ID</th>
                <th>Name</th>
              </tr>
            </thead>
            <tbody style={{cursor: 'pointer'}}>{cates}</tbody>
          </table>      
        </div>
        <div className="container row mt-5">
          <CategoryDetail item={this.state.itemSelected} updateCategories={this.updateCategories} />
        </div>
      </div>
    );
  }
  componentDidMount() {
    this.apiGetCategories();
  }
  updateCategories = (categories) => { // arrow-function
    this.setState({ categories: categories });
  }
  // event-handlers
  trItemClick(item) {
    this.setState({ itemSelected: item });
  }
  // apis
  apiGetCategories() {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.get('/api/admin/categories', config).then((res) => {
      const result = res.data;
      this.setState({ categories: result });
    });
  }
}
export default Category;