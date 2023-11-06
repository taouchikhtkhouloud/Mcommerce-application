import React, { useState, useEffect } from 'react';
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBBtn,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBCollapse,
} from 'mdb-react-ui-kit';
import '../Style/NavBar.css'

export default function App() {
  const [showBasic, setShowBasic] = useState(false);
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem("token")); // Check if the token exists initially

  const token = localStorage.getItem("token");
  useEffect(() => {
    // Listen for changes in the token
    setLoggedIn(!!token); // Update the loggedIn state based on the token's existence
  }, [token]);

  function handleLogout() {
    // Clear the token from local storage
    localStorage.removeItem("token");

    // Update the loggedIn state to reflect the logout
    setLoggedIn(false);

    // Redirect the user to the login page (or any other page)
    window.location.href = "/login";
  }
  
  return (
    <MDBNavbar expand='lg' dark className='navbar'>
      <MDBContainer fluid>
        <MDBNavbarBrand href='/' style={{ marginRight:'650px' }}>Mcommerce</MDBNavbarBrand>

        <MDBNavbarToggler
          aria-controls='navbarSupportedContent'
          aria-expanded='false'
          aria-label='Toggle navigation'
          onClick={() => setShowBasic(!showBasic)}
        >
          <MDBIcon icon='bars' fas />
        </MDBNavbarToggler>

        <MDBCollapse navbar show={showBasic}>
          <MDBNavbarNav className='mr-auto mb-2 mr-0 mb-lg-0'>
            <MDBNavbarItem>
              <MDBNavbarLink  aria-current='page' href='/products'>
                <MDBIcon fas icon="list-alt" /> Products
              </MDBNavbarLink>
            </MDBNavbarItem>
            {loggedIn ? (
              <>
                <MDBNavbarItem>
                  <MDBNavbarLink href='/cart'><MDBIcon fas icon="cart-plus" /> Cart</MDBNavbarLink>
                </MDBNavbarItem>

                <MDBNavbarItem>
                  <MDBDropdown>
                    <MDBDropdownToggle tag='a' className='nav-link' role='button'>
                      <MDBIcon fas icon="user-circle" />
                    </MDBDropdownToggle>
                    <MDBDropdownMenu>
                      <MDBDropdownItem link href='/profile'> <MDBIcon fas icon="user-alt" /> Profile</MDBDropdownItem>
                      <MDBDropdownItem link onClick={handleLogout}><MDBIcon fas icon="sign-out-alt" /> Log out </MDBDropdownItem>
                    </MDBDropdownMenu>
                  </MDBDropdown>
                </MDBNavbarItem>
              </>
            ) : (
              <>
                <MDBNavbarItem>
                  <MDBNavbarLink href='/login'>Sign in</MDBNavbarLink>
                </MDBNavbarItem>

                <MDBNavbarItem>
                  <MDBNavbarLink href='/register'>Sign up</MDBNavbarLink>
                </MDBNavbarItem>
              </>
            )}
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  );
}
