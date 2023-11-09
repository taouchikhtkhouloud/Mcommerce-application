import { Fragment, useState } from "react";
import "../Style/Login.css";
import Alert from "../component/Alert";
import "bootstrap/dist/css/bootstrap.min.css";
function Login() {


  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  async function handleSubmit(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    
    try {
      const response = await fetch("http://localhost:9000/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password })
      });
  
      if (response.ok) {
        console.log("Login successful");
        // window.location.href = "/";
        response.json().then((data) => {
          window.location.href = "/";
          console.log(data);
          localStorage.setItem("token", data);
          console.log("tokem", data);
          localStorage.setItem("user", JSON.stringify(data.user));
        });
      } else {
        alert("password or email not correct");
        window.location.href = "/login";
        console.log("Login failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }


  }
  return (
    <Fragment>
     <section  >
      <div className="container  mb-4">
        <div className="row d-flex justify-content-center align-items-center ">
          <div className="col col-xl-10">
            <div className="card" style={{ borderRadius: '1rem' }}>
              <div className="row g-0">
                <div className="col-md-6 col-lg-5 d-none d-md-block">
                  <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img1.webp"
                    alt="login form"
                    className="img-fluid"
                    style={{ borderRadius: '1rem 0 0 1rem' }}
                  />
                </div>
                <div className="col-md-6 col-lg-7 d-flex align-items-center">
                  <div className="card-body p-4 p-lg-5 text-black">
                    <form action="http://localhost:3001/users" method="post" >
                      <div className="d-flex align-items-center mb-3 pb-1">
                        <span className="h1 fw-bold mb-0">Sign into your account</span>
                      </div>


                      <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="form2Example17">Email address</label>
                        <input type="email" id="form2Example17" className="form-control form-control-lg" onChange={(event)=>setEmail(event.target.value)} />
                      </div>

                      <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="form2Example27">Password</label>
                        <input type="password" id="form2Example27" className="form-control form-control-lg" onChange={(event)=>setPassword(event.target.value)} />
                      </div>

                      <div className="pt-1 mb-4">
                        <button className="btn btn-dark btn-lg btn-block" type="submit" onClick={handleSubmit}>Login</button>
                      </div>

                      <p className="mb-5 pb-lg-2" style={{ color: '#393f81' }}>Don't have an account? <a href="/register" style={{ color: '#393f81' }}>Register here</a></p>
                     
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    </Fragment>
  );
}

export default Login;
