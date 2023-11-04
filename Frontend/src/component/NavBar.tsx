import "../Style/NavBar.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import handleSearch from "../pages/Home";
function NavBar() {
  const [activeLink, setActiveLink] = useState("home");
  
  function handleLogout() {
    // Clear the token from local storage
    localStorage.removeItem("token");
  
    // Redirect the user to the login page (or any other page)
    window.location.href = "/login";
  }
  
    const token = localStorage.getItem("token");
    const loggedIn = !!token;
    return (
      <header className="header-area header-sticky">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <nav className="main-nav">
                <a href="/" className="logo">
                  <h4>
                    <em>Gaming</em> Strore
                  </h4>
                </a>
             
                <ul className="nav">
                  <li>
                    <a href="/" className="active">
                      Home
                    </a>
                  </li>

                  {/* <li>
                    <a href="/checkout">checkout</a>
                  </li> */}
                   {loggedIn ? (
                    <>
                    
                  <li>
                    <a href="/cart">Cart</a>
                  </li>
                  <li>
                    <button onClick={handleLogout}>Log out</button>
                  </li>
                    <li>
                    <a href="/profile">
                      Profile <img src="src\assets\profile-header.jpg" alt="" />
                    </a>
                  </li>
                    </>
                   ) : (
                    <>
                    
                  <li>
                    <a href="/login">login</a>
                  </li>
                  <li>
                    <a href="/register">sign up</a>
                  </li>
                
                    </>
                   )}
                </ul>
                <a className="menu-trigger">
                  <span>Menu</span>
                </a>
              </nav>
            </div>
          </div>
        </div>
      </header>
    );
  }
export default NavBar;
