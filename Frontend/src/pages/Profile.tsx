import "../Style/profile.css";

import profile from "../assets/user.webp";
import profileg from "../assets/userF.jpeg";
import { useState, useEffect, Fragment } from "react";
import axios from 'axios';

function Profile() {
  interface User {
    gender: string;
    firstName: string;
    lastName: string;
    email: string;
    age: number;
    phone: string;
  }

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios.get("http://localhost:9000/users/", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          if (response.status === 200) {
            setUser(response.data);
          } else {
            window.location.href = "/login";
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          // Handle error as needed
        });
    } else {
      window.location.href = "/login";
    }
  }, []);
  


  // var image = profile;
  // if (data.gender === "female") {
  //   image = profileg;
  // }
  return (
    <Fragment>
      <div className="widt">
        <div className="row">
          <div className="col-lg-12">
            <div className="page-content">
              <div className="row">
                <div className="col-lg-12">
                  <div className="main-profile">
                    <div className="row">
                      <div className="col-lg-4">
                        {/* Render user profile image here */}
                        <img src={user?.gender === "female" ? profileg : profile} alt="Profile Image" />
                      </div>
                      <div className="col-lg-4 align-self-center">
                        <div className="main-info header-text">
                          <h1 id="firstname">{user?.firstName}</h1>
                          <h5 id="lastname">{user?.lastName}</h5>
                          <p>"I'm {user?.firstName}, Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium, ratione. Et possimus, sunt odio, porro exercitationem dolorum, debitis iusto neque harum asperiores nulla laudantium maxime magnam illum autem officiis quia. "</p>
                          <ul>
                          <li>
                            Email :<span>{user?.email}</span>
                          </li>
                          <li>
                            Age :<span>{user?.age}</span>
                          </li>
                          <li>
                            Phone Number : <span>{user?.phone}</span>
                          </li>
                         
                        </ul>
                          <div className="main-border-button">
                            <a href="#">Update</a>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-4 align-self-center">
                       
                      </div>
                    </div>
                    {/* Rest of the JSX code */}
                    {/* ... */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
export default Profile;
