import React, { useState } from 'react'
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { Link, useNavigate } from 'react-router-dom';


export default function Login() {
    let navigate = useNavigate()
    const [loginValue, setLoginValue] = useState({ email: "", password: "" })
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:4000/api/LoginUser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: loginValue.email, password: loginValue.password })

        });
        const json = await response.json()
        console.log(json);
        if (!json.success) {
            alert("please enter valid credentials")
        } else {
            localStorage.setItem("userEmail", loginValue.email);
            localStorage.setItem("authToken", json.authToken);
            console.log(localStorage.getItem("authToken"));
            navigate('/')
        }
    }
    const onChange = (e) => {
        setLoginValue({ ...loginValue, [e.target.name]: e.target.value })
    }
    return (
        <>
           <div>
            <Navbar/>
           </div>
            <section className="vh-100">
                <div className="container-fluid h-custom">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                    
                        <div className="col-md-9 col-lg-6 col-xl-5">
                           
                      <input type="image" src ={require('../vectors/Order-food-amico.png')} alt="photo" width={'700px'} />
                        </div>
                        <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                            <h1 className='font-link mb-3'> GoFood &nbsp;&nbsp; Login Here</h1>
                            <form onSubmit={handleSubmit}>

                                <div className="form-outline mb-4">
                                    <input type="email" id="form3Example3" className="form-control form-control-lg" name='email' value={loginValue.email} onChange={onChange}
                                        placeholder="Enter a valid email address" />
                                    <label className="form-label" for="form3Example3">Email address</label>
                                </div>


                                <div className="form-outline mb-3">
                                    <input type="password" id="form3Example4" className="form-control form-control-lg"
                                        placeholder="Enter password" name="password" value={loginValue.password} onChange={onChange} />
                                    <label className="form-label" for="form3Example4">Password</label>
                                </div>

                                {/* <div className="d-flex justify-content-between align-items-center">

                              
                                    <a href="#!" className="text-body">Forgot password?</a>
                                </div> */}

                                <div className="text-center text-lg-start mt-4 pt-2">
                                
                                    <button type="submit" className="btn btn-success btn-lg"
                                        style={{paddingLeft: '2.5rem', paddingRight: '2.5rem'}}>Login</button>
                                    <p className="small fw-bold mt-2 pt-1 mb-0">Don't have an account?   <Link to='/signup' className='btn btn-warning'>Create Account</Link></p>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </section>
            <div>
                <Footer/>
            </div>
        </>
    )
}
