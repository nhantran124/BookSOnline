import React, { Component } from 'react';
import { FaPhone, FaMapMarkerAlt, FaMailBulk, FaInstagram, FaYoutube, FaFacebookSquare, FaConnectdevelop } from 'react-icons/fa';
import MyContext from '../contexts/MyContext';
import { Link } from 'react-router-dom';
import withRouter from '../utils/withRouter';
import axios from 'axios';
class Footer extends Component {
    static contextType = MyContext;
    constructor(props) {
        super(props);
        this.state = {
            categories: [],
        };
    }
    render() {
        const iconSize = { fontSize: "18px"}
        const cates = this.state.categories.map((item) => {
            return (
              // <li key={item._id} className="menu"><Link to={'/product/category/' + item._id}>{item.name}</Link></li>
              <li className='mb-4' key={item._id}><Link to={'/product/category/' + item._id} className='non'>{item.name}</Link></li>
            );
          });
        return (
            <footer className="footer mt-auto py-3  ">
                <div className="container text-center mt-4 ">
                    <h2 className="fw-bold mb-3">Join Our Newsletter</h2>
                    <h4 className="fw-bold">Signup to be the first to hear about exclusive deals, special offers and upcoming collections</h4>
                </div>
                <div className="container">
                    <div className="row mt-5 row-cols-1 row-cols-sm-2 row-cols-md-5 py-5 my-5 border-top ">
                        <div className="col-md-3 col-sm-6">
                            <h4 className='mb-4'>Contact Us</h4>
                            <ul className='list-unstyled'>
                                <li className='d-flex align-items-center mb-4'>
                                    <FaPhone />
                                    <span className='mx-2'>+112 3384 999</span>
                                </li>
                                <li className='d-flex align-items-center mb-4'>
                                    <FaMapMarkerAlt /> 
                                    <span className='mx-2'>112/3 Bui Thi Xuan, District 1, HCM</span>
                                </li>
                                <li className='mb-4'>
                                    <FaMailBulk /> 
                                    <span className='mx-2'>BookSonline2023@gmail.com</span>
                                </li>
                            </ul>
                            <div className="d-flex mb-4">
                                <h5 className='list-unstyled me-4'>
                                    <FaConnectdevelop/> Connect
                                </h5>
                                <span style = {iconSize} className='me-4'><FaInstagram /></span>
                                <span style = {iconSize} className='me-4'><FaYoutube /></span>
                                <span style = {iconSize} className='me-4'><FaFacebookSquare /></span>
                            </div>
                        </div>
                        {/* <div className="col-md-3 col-sm-6">
                            <h4 className='mb-4'>Explore</h4>
                            <ul className='list-unstyled'>
                                <li className='mb-4'>About us</li>
                                <li className='mb-4'>Bookmarks</li>
                                <li className='mb-4'>Sign in/join</li>
                            </ul>
                        </div> */}
                        <div className="col-md-3 col-sm-6">
                            <h4 className='mb-4'>Customer Service</h4>
                            <ul className='list-unstyled'>
                                <li className='mb-4'>Help Center</li>
                                <li className='mb-4'>Product Recalls</li>
                                <li className='mb-4'>Accessibility</li>
                                <li className='mb-4'>Contact Us</li>
                                <li className='mb-4'>Store Pickup</li>
                            </ul>
                        </div>
                        <div className="col-md-3 col-sm-6">
                            <h4 className='mb-4'>Policy</h4>
                            <ul className='list-unstyled'>
                                <li className='mb-4'>Return Policy</li>
                                <li className='mb-4'>Terms Of Use</li>
                                <li className='mb-4'>Security</li>
                                <li className='mb-4'>Privacy</li>
                            </ul>
                        </div>
                        <div className="col-md-3 col-sm-6">
                            <h4 className='mb-4'>Categories</h4>
                            <ul className='list-unstyled'>
                                {cates}
                            </ul>
                        </div>
                    </div>
                </div>
            </footer>
        );
    };
    componentDidMount() {
        this.apiGetCategories();
    }
    // apis
    apiGetCategories() {
        axios.get('/api/customer/categories').then((res) => {
            const result = res.data;
            this.setState({ categories: result });
        });
    }
}

export default withRouter(Footer);
