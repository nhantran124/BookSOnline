import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';
import '../styles.css'
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newprods: [],
      hotprods: []
    };
  }
  render() {
    const newprods = this.state.newprods.map((item) => {
      return (
        // <div key={item._id} className="inline">
        //   <figure>
        //     <Link to={'/product/' + item._id}><img src={"data:image/jpg;base64," + item.image} width="300px" height="300px" alt="" /></Link>
        //     <figcaption className="text-center">{item.name}<br />Author: {item.author}<br />Price: {item.price}</figcaption>
        //   </figure>
        // </div>
        <div key={item._id} className="inline mx-5 ">
          <Card>
            <Card.Img variant="top" src={"data:image/jpg;base64," + item.image} width="300px" height="300px" alt="" />
            <Card.Body>
              <Card.Title className="text-center">{item.name}</Card.Title>
              <Card.Text className="text-center ">{item.author}</Card.Text>
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
    const hotprods = this.state.hotprods.map((item) => {
      return (
        <div key={item._id} className="inline mx-5 ">
          <Card>
            <Card.Img variant="top" src={"data:image/jpg;base64," + item.image} width="300px" height="300px" alt="" />
            <Card.Body>
              <Card.Title className="text-center">{item.name}</Card.Title>
              <Card.Text className="text-center ">{item.author}</Card.Text>
              <Card.Text className="text-center">Price: {item.price}</Card.Text>
            </Card.Body>
            <Card.Footer className="text-center bg-white border-0 mb-4">
              <Link to={'/product/' + item._id}>
                <Button variant="outline-dark">Detail</Button>
              </Link>
            </Card.Footer>
          </Card>
        </div>
      );
    });
    return (
      <div className=''>
        <div className="align-center">
          <h4> </h4>
          <h2 className="text-center mt-2">NEW PRODUCTS</h2>
          {newprods}
        </div>
        {this.state.hotprods.length > 0 ?
          <div className="align-center">
            <h2 className="text-center mt-2">HOT PRODUCTS</h2>
            {hotprods}
          </div>
          : <div />}
      </div>
    );
  }
  componentDidMount() {
    this.apiGetNewProducts();
    this.apiGetHotProducts();
  }
  // apis
  apiGetNewProducts() {
    axios.get('/api/customer/products/new').then((res) => {
      const result = res.data;
      this.setState({ newprods: result });
    });
  }
  apiGetHotProducts() {
    axios.get('/api/customer/products/hot').then((res) => {
      const result = res.data;
      this.setState({ hotprods: result });
    });
  }
}
export default Home;