import React from "react";
import { Input, Layout, Dropdown, Menu } from "antd";
import { CaretDownOutlined,BellFilled,DownOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
import logo from "../../assets/img/logo.png";
import thumb from "../../assets/img/thumb.png";
import GoogleTranslate from "../../components/atoms/Google";

const { Header } = Layout;
const { Search } = Input;
const onSearch = (value) => console.log(value);

export default function AppHeader() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
    // localStorage.clear();
  };
  const menu = (
    <Menu>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" href="">
          Edit Profile
        </a>
      </Menu.Item>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" href="">
          My Inbox
        </a>
      </Menu.Item>
      <Menu.Item>
        <a
          target="_blank"
          rel="noopener noreferrer"
          onClick={()=>navigate("/user/setting")}
          
        >
         
          Settings
        </a>
      </Menu.Item>
      <Menu.Item>  <a
          target="_blank"
          rel="noopener noreferrer"
          onClick={()=>{handleLogout()}}
        >
          Logout
        </a></Menu.Item>
    </Menu>
    );

  return (
    <nav className="sb-topnav navbar navbar-expand ">
      <a className="navbar-brand" href="">
        <img className="img-fluid" src={logo} alt="" width="80%" />
      </a>
      <button
        className="btn btn-link btn-lg order-1 order-lg-0"
        id="sidebarToggle" data-target="#navbarSupportedContent"
        href="#"
      >
        <svg
          className="svg-inline--fa fa-bars fa-w-14"
          aria-hidden="true"
          focusable="false"
          data-prefix="fas"
          data-icon="bars"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
          data-fa-i2svg=""
        >
          <path
            fill="currentColor"
            d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z"
          ></path>
        </svg>
      </button>

      <form className="d-none d-md-inline-block form-inline ml-auto mr-0 mr-md-4 my-2 my-md-0">
        <div className="input-group custome-search">
          <input
            className="form-control"
            type="text"
            placeholder="Search for..."
            aria-label="Search"
            aria-describedby="basic-addon2"
          />
          <div className="input-group-append">
            <button className="btn btn-primary" type="button">
              <i className="fas fa-search"></i>
            </button>
          </div>
        </div>
      </form>   
    <GoogleTranslate/>
      <ul className="navbar-nav ml-auto ml-md-0">
        <li className="nav-item dropdown">
          <Dropdown overlay={menu}>
            <a
              className="ant-dropdown-link"
              onClick={(e) => e.preventDefault()}
            >
          <BellFilled style={{paddingLeft:"10px"}} /><CaretDownOutlined />
            </a>
          </Dropdown>
        </li>
      </ul>

      <ul className="navbar-nav ml-auto ml-md-0" style={{paddingLeft:"10px"}}>
         <li className="nav-item dropdown">
        <Dropdown overlay={menu}>
            <a
              className="ant-dropdown-link"
              onClick={(e) => e.preventDefault()}
            >
          <img src={thumb} className="circle" width="35px" height="35px " alt="" /><CaretDownOutlined/>
            </a>
          </Dropdown>
          {/* <a
            className="nav-link dropdown-toggle"
            id="userDropdown"
            href="#"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <span className="bell-icon-custom">
              <i className="fa fa-bell"></i>
            </span>
          </a>
          <div
            className="dropdown-menu dropdown-menu-right"
            aria-labelledby="userDropdown"
          >
            <a className="dropdown-item small" href="#">
              Jhon Submited the claims
            </a>
            <a className="dropdown-item small" href="#">
              MacMohn on leave today
            </a>
            <a className="dropdown-item small" href="#">
              Jerry submitted the application form
            </a>
            <a className="dropdown-item small" href="#">
              Jhon Submited the claims
            </a>
            <a className="dropdown-item small" href="#">
              MacMohn on leave today
            </a>
          </div> */}
        </li> 
      </ul>

     
    </nav>
  );
}
