import React, { useState, useEffect } from 'react';
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBDropdown,
    MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBContainer, MDBIcon } from "mdbreact";

const Navbar = () => {
     const [collapseID,setCollapseID]=useState(false);

     const toggleCollapse=()=>{
         setCollapseID(!collapseID);
     }
     const logoutReq = ()=>{
         localStorage.clear();
         window.location.href="/login"
     }
  
    return (
        <header>
        <MDBContainer>
          <MDBNavbar color="info-color" dark expand="md" style={{ marginTop: "20px" }}>
            <MDBNavbarBrand href="/">
              <strong className="white-text">Test </strong>
            </MDBNavbarBrand>
            <MDBNavbarToggler onClick={()=>toggleCollapse("navbarCollapse3")} />
            <MDBCollapse id="navbarCollapse3" isOpen={collapseID} navbar>
              <MDBNavbarNav right>
              <MDBNavItem>
                  <MDBNavLink className="waves-effect waves-light" to="/">
                    <MDBIcon icon="home" className="mr-1" />Home</MDBNavLink>
                </MDBNavItem>
                <MDBNavItem>
                  <MDBNavLink className="waves-effect waves-light" to="/#">
                    <MDBIcon icon="envelope" className="mr-1" />Contact</MDBNavLink>
                </MDBNavItem>
                {
                  localStorage.getItem("token")?<>
                   <MDBNavItem>
                  <MDBDropdown>
                    <MDBDropdownToggle nav caret>
                      <MDBIcon icon="user" className="mr-1"  onClick={()=>window.location.href="/profile"}/>Profile
                    </MDBDropdownToggle>
                    <MDBDropdownMenu className="dropdown-default" right>
                      <MDBDropdownItem href="/profile">My Profile</MDBDropdownItem>
                      <MDBDropdownItem onClick={()=>{
                       logoutReq();
                       }}>Log out</MDBDropdownItem>
                    </MDBDropdownMenu>
                  </MDBDropdown>
                </MDBNavItem></> :<>
                 <MDBNavItem>
                  <MDBNavLink className="waves-effect waves-light" to="/login">
                    <MDBIcon icon="user" className="mr-1" />Login</MDBNavLink>
                </MDBNavItem>
                <MDBNavItem>
                  <MDBNavLink className="waves-effect waves-light" to="/signup">
                    <MDBIcon icon="" className="mr-1" />Signup</MDBNavLink>
                </MDBNavItem></>
                }
              </MDBNavbarNav>
            </MDBCollapse>
          </MDBNavbar>
        </MDBContainer>
     
        </header>
    )
}


export default Navbar;
