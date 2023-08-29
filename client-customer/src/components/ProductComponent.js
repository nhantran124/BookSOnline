import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import withRouter from '../utils/withRouter';
import { Card, Button } from 'react-bootstrap';
class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: []
    };
  }
  render() {
    const prods = this.state.products.map((item) => {
      return (
        // <div key={item._id} className="inline">
        //   <figure>
        //     <Link to={'/product/' + item._id}><img src={"data:image/jpg;base64," + item.image} width="300px" height="300px" alt="" /></Link>
        //     <figcaption className="text-center">{item.name}<br />Author: {item.author}<br />Price: {item.price}</figcaption>
        //   </figure>
        // </div>
        <div key={item._id} className="col-md-4 mb-4">
          <Card>
            <Card.Img variant="top" src={"data:image/jpg;base64," + item.image} alt="" />
            <Card.Body>
              <Card.Title className="text-center">{item.name}</Card.Title>
              <Card.Text className="text-center">{item.author}</Card.Text>
              <Card.Text className="text-center">Price: {item.price}</Card.Text>
            </Card.Body>
            <Card.Footer className="text-center bg-white border-0 mb-4">
              <Link to={'/product/' + item._id}>
                <Button variant="outline-dark">Details</Button>
              </Link>
            </Card.Footer>
          </Card>
        </div>
      );
    });
    return (
      // <div className="text-center">
      //   <h2 className="text-center">LIST PRODUCTS</h2>
      //   {prods}
      // </div>
      <div className="container">
        <h2 className="text-center my-5">LIST PRODUCTS</h2>
        <div className="row">
          {prods}
        </div>
      </div>
    );
  }
  componentDidMount() { // first: /product/...
    const params = this.props.params;
    if (params.cid) {
      this.apiGetProductsByCatID(params.cid);
    } else if (params.keyword) {
      this.apiGetProductsByKeyword(params.keyword);
    }
  }
  componentDidUpdate(prevProps) { // changed: /product/...
    const params = this.props.params;
    if (params.cid && params.cid !== prevProps.params.cid) {
      this.apiGetProductsByCatID(params.cid);
    } else if (params.keyword && params.keyword !== prevProps.params.keyword) {
      this.apiGetProductsByKeyword(params.keyword);
    }
  }
  // apis
  apiGetProductsByCatID(cid) {
    axios.get('/api/customer/products/category/' + cid).then((res) => {
      const result = res.data;
      this.setState({ products: result });
    });
  }
  apiGetProductsByKeyword(keyword) {
    axios.get('/api/customer/products/search/' + keyword).then((res) => {
      const result = res.data;
      this.setState({ products: result });
    });
  }
}
export default withRouter(Product);