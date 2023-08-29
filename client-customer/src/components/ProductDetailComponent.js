import axios from 'axios';
import React, { Component } from 'react';
import withRouter from '../utils/withRouter';
import MyContext from '../contexts/MyContext';
import swal from 'sweetalert';

class ProductDetail extends Component {
  static contextType = MyContext; // using this.context to access global state
  constructor(props) {
    super(props);
    this.state = {
      product: null,
      txtQuantity: 1
    };
  }
  render() {
    const prod = this.state.product;
    if (prod != null) {
      return (
        <div className="align-center">
          <h2 className="text-center">PRODUCT DETAILS</h2>
          <figure className="caption-right">
            <img src={"data:image/jpg;base64," + prod.image} width="600px" height="600px" alt="" />
            <figcaption>
              <form>
                <table>
                  <tbody>
                    <tr>
                      <td>ID: {prod._id}</td>
                    </tr>
                    <tr>
                      {/* <td align="right">Name:</td> */}
                      <h1>{prod.name}</h1>
                    </tr>
                    <tr>
                      <h4>{prod.price}$</h4>
                    </tr>
                    <tr>
                      <h4 class='fw-bold'>{prod.category.name}</h4>
                    </tr>
                    <tr>
                      <div class='d-flex'>
                        <input className='form-control text-center me-3' type="number" min="1" max="99" value={this.state.txtQuantity} onChange={(e) => { this.setState({ txtQuantity: e.target.value }) }} />
                        
                        <button className="btn btn-outline-dark " type="submit" onClick={(e) => this.btnAdd2CartClick(e)}>
                          Add to cart
                        </button>
                      </div>
                    </tr>
                  </tbody>
                </table>
              </form>
            </figcaption>
          </figure>
        </div>
      );
    }
    return (<div />);
  }
  // event-handlers
  btnAdd2CartClick(e) {
    e.preventDefault();
    const product = this.state.product;
    const quantity = parseInt(this.state.txtQuantity);
    if (quantity < 100) {
      const mycart = this.context.mycart;
      const index = mycart.findIndex(x => x.product._id === product._id); // check if the _id exists in mycart
      if (index === -1) { // not found, push newItem
        const newItem = { product: product, quantity: quantity };
        mycart.push(newItem);
      } else { // increasing the quantity
        mycart[index].quantity += quantity;
      }
      this.context.setMycart(mycart);
      //this.props.navigate('/home');
      //alert('OK BABY!');
    } else {
      swal('Error', 'Invalid quantity!', 'error');
    }
  }
  componentDidMount() {
    const params = this.props.params;
    this.apiGetProduct(params.id);
  }
  // apis
  apiGetProduct(id) {
    axios.get('/api/customer/products/' + id).then((res) => {
      const result = res.data;
      this.setState({ product: result });
    });
  }
}
export default withRouter(ProductDetail);