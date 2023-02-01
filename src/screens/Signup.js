import React, { useState } from "react";
import {  useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function Signup() {
  let navigate = useNavigate();
  const [formValue, setFormValue] = useState({
    name: "",
    email: "",
    password: "",
    geolocation: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:4000/api/CreateUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: formValue.name,
        email: formValue.email,
        password: formValue.password,
        location: formValue.geolocation,
      }),
    });
    const json = await response.json();
    console.log(json);
    if (!json.success) {
      alert("please enter valid credentials");
    } else {
      navigate("/login");
    }
  };
  const onChange = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };
  return (
    <>
    <div>
        <Navbar/>
    </div>
      <section className="text-center text-lg-start">
        <div className="container py-5">
          <div className="row g-0 align-items-center">
            <div className="col-lg-6 mb-5 mb-lg-0">
              <div
                className="card cascading-right"
                style={{
                  background: "hsla(0, 0%, 100%, 0.55)",
                  backdropFilter: "blur(50px)",
                }}
              >
                <div className="card-body  p-5 shadow-5 text-center">
                  {/* <h2 className="fw-bold mb-5">Sign up now</h2> */}
                  <h1 className='font-link mb-3'> GoFood &nbsp;&nbsp;Sign up Now</h1>
                  <form onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="form-outline mb-4">
                        <input
                          type="text"
                          id="form3Example1"
                          className="form-control"
                          name="name"
                          value={formValue.name}
                          onChange={onChange}
                        />
                        <label className="form-label" for="form3Example1">
                          Full Name
                        </label>
                      </div>
                    </div>

                    <div className="form-outline mb-4">
                      <input
                        type="email"
                        id="form3Example3"
                        className="form-control"
                        name="email"
                        value={formValue.email}
                        onChange={onChange}
                      />
                      <label className="form-label" for="form3Example3">
                        Email address
                      </label>
                    </div>

                    <div className="form-outline mb-4">
                      <input
                        type="password"
                        id="form3Example4"
                        className="form-control"
                        name="password"
                        value={formValue.password}
                        onChange={onChange}
                      />
                      <label className="form-label" for="form3Example4">
                        Password
                      </label>
                    </div>

                    <div className="form-outline mb-4">
                      <input
                        type="text"
                        id="form3Example4"
                        className="form-control"
                        name="geolocation"
                        value={formValue.geolocation}
                        onChange={onChange}
                      />
                      <label className="form-label" for="form3Example4">
                        Address
                      </label>
                    </div>

                    <button
                      type="submit"
                      className="btn btn-success btn-lg  btn-block mb-4"
                    >
                      Sign up
                    </button>
                  </form>
                  {/* <Link to="/login" className="btn btn-success">
                    Login
                  </Link> */}
                </div>
              </div>
            </div>

            <div className="col-lg-6 mb-5 mb-lg-0 px-4">
              <input type="image"
               src={require('../vectors/Order-food-pana.png')}
                className="w-100 rounded-4 shadow-4" 
                alt="" width={'70px'} height={'600px'}
              />
            </div>
          </div>
        </div>
      </section>
      <div>

      <Footer/>
      </div>
    </>
  );
}
