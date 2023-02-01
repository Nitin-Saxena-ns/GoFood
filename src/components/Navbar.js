import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Badge } from 'react-bootstrap';
import { useCart } from './ContextReducer';
import Modal from '../Modal';
import Cart from '../screens/Cart';


export default function Navbar() {
    const [cartView,setCartView]=useState(false);
    let data = useCart();
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem("authToken");
        navigate('/');
    }


    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand fs-2 font-link" to="/" >GoFood</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">

                        <div class="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav me-auto mb-2">
                                <li className="nav-item active">
                                    <Link className="nav-link fs-5 mt-2" aria-current="page" to="/">Home</Link>
                                </li>
                                {
                                    (localStorage.getItem("authToken")) ?
                                        <li className="nav-item active">
                                            <Link className="nav-link fs-5 mt-2" aria-current="page" to="/myorder">My Orders</Link>
                                        </li>
                                        : ""
                                }

                            </ul>
                        </div>

                        {
                            (!localStorage.getItem("authToken")) ?
                                <div className="d-flex ">
                                    <Link className="btn bg-white text-success mx-1" to="/signup">Sign up</Link>
                                    <Link className="btn bg-white text-success mx-1" to="/login">Login</Link>
                                </div>


                                : <div><div className="btn bg-white text-success mx-1" onClick={()=>setCartView(true)} >My Cart
                                    <Badge pill bg="danger">{data.length}</Badge></div>
                                    {cartView ?<Modal onClose={()=>setCartView(false)} ><Cart/></Modal>:null} 
                                    <div className="btn bg-white text-danger mx-1" aria-current="page"  onClick={handleLogout}>Logout</div>
                                </div>
                        }

                    </div>
                </div>
            </nav>
        </div>
    )
}
