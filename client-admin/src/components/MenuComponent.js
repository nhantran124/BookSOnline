import React, { Component } from 'react';
import MyContext from '../contexts/Mycontext';
import { Link } from 'react-router-dom';
import '../css/menu.css'
import { GrHomeRounded, GrLogout } from 'react-icons/gr';
import { TbCategory } from 'react-icons/tb';
import { BsNewspaper } from 'react-icons/bs';
import { BiUserCircle, BiChevronsRight } from 'react-icons/bi';
import { MdOutlineProductionQuantityLimits } from 'react-icons/md'
class Menu extends Component {
  static contextType = MyContext; // using this.context to access global state
  constructor(props) {
    super(props);
    this.state = {
      isSidebarOpen: true,
    };
  }

  render() {
    const { isSidebarOpen} = this.state;
    
    return (
      // <div className="border-bottom">
      //   <div className="float-left">
      //     <ul className="menu">
      //       <li className="menu"><Link to='/admin/home'>Home</Link></li>
      //       <li className="menu"><Link to='/admin/category'>Category</Link></li>
      //       <li className="menu"><Link to='/admin/product'>Product</Link></li>
      //       <li className="menu"><Link to='/admin/order'>Order</Link></li>
      //       <li className="menu"><Link to='/admin/customer'>Customer</Link></li>
      //     </ul>
      //   </div>
      //   <div className="float-right">
      //     Hello <b>{this.context.username}</b> | <Link to='/admin/home' onClick={() => this.lnkLogoutClick()}>Logout</Link>
      //   </div>
      //   <div className="float-clear" />
      // </div>
      <nav className={`sidebar ${isSidebarOpen ? 'open' : 'close'}`}>
        <header>
          <div className="image-text">
            <span className="image">
              <img src="https://i.imgur.com/8Km9tLL.jpg" alt="logo" />
            </span>
            <div className="text logo-text">
              <span className="name">BookSOnline</span>
              <span className="profession">Admin</span>
            </div>
          </div>
          <i className='toggle' onClick={this.toggleSidebar}><BiChevronsRight/></i>
        </header>
        <div className="menu-bar">
          <div className="menu">
            <ul className="menu-links">
              <li className="nav-link">
                <Link to='/admin/home'>
                  <i className='icon'><GrHomeRounded /></i>
                  <span className='text nav-text'>Home</span>
                </Link>
              </li>
              <li className="nav-link">
                <Link to='/admin/category'>
                  <i className='icon'><TbCategory /></i>
                  <span className='text nav-text'>Category</span>
                </Link>
              </li>
              <li className="nav-link">
                <Link to='/admin/product'>
                  <i className='icon'><MdOutlineProductionQuantityLimits /></i>
                  <span className='text nav-text'>Product</span>
                </Link>
              </li>
              <li className="nav-link">
                <Link to='/admin/order'>
                  <i className='bx bx-box icon' ><BsNewspaper/></i>
                  <span className='text nav-text'>Order</span>
                </Link>
              </li>
              <li className="nav-link">
                <Link to='/admin/customer'>
                  <i className='bx bx-box icon' ><BiUserCircle/></i>
                  <span className='text nav-text'>Customer</span>
                </Link>
              </li>
            </ul>
          </div>
          <div className="bottom-content">
            <li className="">
              <Link to='/admin/home' onClick={() => this.lnkLogoutClick()}>
                <i className="bx bx-log-out icon"><GrLogout/></i>
                <span className="text nav-text">Logout</span>
              </Link>
            </li>
          </div>
        </div>
      </nav>
    );
  }
  // event-handlers
  lnkLogoutClick() {
    this.context.setToken('');
    this.context.setUsername('');
  }
  toggleSidebar = () => {
    this.setState((prevState) => ({
      isSidebarOpen: !prevState.isSidebarOpen,
    }));
  };
}
export default Menu;