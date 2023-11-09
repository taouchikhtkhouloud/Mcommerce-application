import { useState } from "react";

function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState<number | ''>(''); // State for age  
  const [phone, setPhoneNumber] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [confpassword, setconfPassword] = useState("");
  const handleAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Ensure the input value is within the desired range
    const newAge = Math.min(130, Math.max(0, +e.target.value)) || '';

    setAge(newAge);
  };
  async function handleSubmit(event:  React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();

   console.log("login",email, password, firstName, lastName, age, phone, gender )

    if (password === confpassword) {
      try {
        const response = await fetch("http://localhost:9000/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ email, password, firstName, lastName, age, phone, gender })
        });
    
        if (response.ok) {
          console.log("Registered successful");
          window.location.href = "/login";
        } else {
          console.log("Registered failed");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    } else {
      alert("passwords doesn't match");
    }
  }
  return (
    <section className=" ">
    <div className="container  h-100">
      <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col">
          <div className="card card-registration my-4">
            <div className="row g-0">
              <div className="col-xl-6 d-none d-xl-block">
                <img
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/img4.webp"
                  alt="Sample photo"
                  className="img-fluid"
                  style={{
                    borderTopLeftRadius: '.25rem',
                    borderBottomLeftRadius: '.25rem',
                  }}
                />
              </div>
              <div className="col-xl-6">
                <div className="card-body p-md-5 text-black">
                  <h3 className="mb-5 text-uppercase"> registration form</h3>

                  <div className="row">
                    <div className="col-md-6 mb-4">
                      <div className="form-outline">
                        <input
                          type="text"
                          id="form3Example1m"
                          className="form-control form-control-lg"
                          onChange={(event) => setFirstName(event.target.value)}                        />
                        <label className="form-label" htmlFor="form3Example1m">
                          First name
                        </label>
                      </div>
                    </div>
                    <div className="col-md-6 mb-4">
                      <div className="form-outline">
                        <input
                          type="text"
                          id="form3Example1n"
                          className="form-control form-control-lg"
                          onChange={(event) => setLastName(event.target.value)}
                        />
                        <label className="form-label" htmlFor="form3Example1n">
                          Last name
                        </label>
                      </div>
                    </div>
                  </div>

                  

                  <div className="form-outline mb-4">
                    <input
                      type="email"
                      id="form3Example8"
                      className="form-control form-control-lg"
                      onChange={(event) => setEmail(event.target.value)}
                    />
                    <label className="form-label" htmlFor="form3Example8">
                      Email
                    </label>
                  </div>
                  <div className="form-outline mb-4">
                    <input
                      type="text"
                      id="form3Example8"
                      className="form-control form-control-lg"
                      onChange={(event) => setPhoneNumber(event.target.value)}                    />
                    <label className="form-label" htmlFor="form3Example8">
                      Phone
                    </label>
                  </div>
                  <div className="form-outline mb-4">
        <input
          type="number"
          id="formAge"
          className="form-control form-control-lg"
          value={age}
          onChange={handleAgeChange}
          min="0"
          max="130"
        />
        <label className="form-label" htmlFor="formAge">
          Age
        </label>
      </div>
                  <div className="form-outline mb-4">
                    <input
                      type="password"
                      id="form3Example8"
                      className="form-control form-control-lg"
                      onChange={(event) => setPassword(event.target.value)}                  />
                    <label className="form-label" htmlFor="form3Example8">
                      Password
                    </label>
                  </div>
                  <div className="form-outline mb-4">
                    <input
                      type="password"
                      id="form3Example8"
                      className="form-control form-control-lg"
                      onChange={(event) => setconfPassword(event.target.value)}                 />
                    <label className="form-label" htmlFor="form3Example8">
                      Confirm Password
                    </label>
                  </div>
                  

                  <div className="d-md-flex justify-content-start align-items-center mb-4 py-2">
                    <h6 className="mb-0 me-4">Gender: </h6>
                    <div className="form-check form-check-inline mb-0 me-4">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="inlineRadioOptions"
                        id="femaleGender"
                        value="option1"
                        onChange={(event) => setGender(event.target.value)}

                      />
                      <label className="form-check-label" htmlFor="femaleGender">
                        Female
                      </label>
                    </div>
                    <div className="form-check form-check-inline mb-0 me-4">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="inlineRadioOptions"
                        id="maleGender"
                        value="option2"
                        onChange={(event) => setGender(event.target.value)}
                      />
                      <label className="form-check-label" htmlFor="maleGender">
                        Male
                      </label>
                    </div>
                    <div className="form-check form-check-inline mb-0">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="inlineRadioOptions"
                        id="otherGender"
                        value="option3"
                        onChange={(event) => setGender(event.target.value)}

                      />
                      <label className="form-check-label" htmlFor="otherGender">
                        Other
                      </label>
                    </div>
                  </div>

                  
              

                  <div className="d-flex justify-content-end pt-3">
                   
                    <button type="button" style={{backgroundColor:"#672bac"}} className="btn btn-dark  ms-2" onClick={handleSubmit} >
                      Sign up
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  );
}

export default Register;