import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function Home() {
    const [search, setSearch] = useState("");
    const [foodCat, setFoodCat] = useState([]);
    const [foodItems, setFoodItems] = useState([]);

    const loadData = async () => {
        let response = await fetch("http://localhost:4000/api/foodData", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        response = await response.json();
        // console.log(response[0],response[1]);
        setFoodItems(response[0]);
        setFoodCat(response[1]);
    }


    useEffect(() => {
        loadData()
    }, []);




    return (
        <>
            <div><Navbar /></div>
            <div>
                <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" >
                    <div className="carousel-inner" id="carousel">
                        <div className="carousel-caption" style={{ "zIndex": "10" }}>
                            <div className="d-flex justify-content-center">
                                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search}  onChange={(e)=>{setSearch(e.target.value)}}/>
                                {/* <button className="btn btn-success" type="submit">Search</button> */}
                            </div>
                        </div>
                        <div className="carousel-item active">
                            <img src="https://source.unsplash.com/random/900×700/?Burger" className="d-block w-100" style={{ filter: "brightness(30%)", objectFit: 'cover !important', width: '100% !important', height: '100% !important' }} alt="..." />
                        </div>
                        <div className="carousel-item">
                            <img src="https://source.unsplash.com/random/900×700/?Pastry" className="d-block w-100" style={{ filter: "brightness(30%)", objectFit: 'cover !important', width: '100%!important', height: '100% !important' }} alt="..." />
                        </div>
                        <div className="carousel-item">
                            <img src="https://source.unsplash.com/random/900×700/?Pizza" className="d-block w-100" style={{ filter: "brightness(30%)", objectFit: 'cover !important', width: '100% !important', height: '100% !important' }} alt="..." />
                        </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            </div>
            <div className="container">
                {

                    foodCat === [] ?
                        console.log("")
                        : foodCat.map((data) => {
                            return (
                                <div className="row mb-3">
                                    <div key={data._id} className="fs-2 m-3">
                                        {data.CategoryName}
                                    </div>
                                    <hr />
                                    {
                                        foodItems === [] ? ""
                                            : foodItems.filter((items) => (items.CategoryName === data.CategoryName) && ( items.name.toLowerCase().includes(search.toLocaleLowerCase())))
                                            .map((filteritems) => {
                                                return (
                                                    <>
                                                        <div className="col-12 col-md-6 col-lg-3">
                                                            <Card
                                                             key={filteritems._id}
                                                                foodItems={filteritems}
                                                                options={filteritems.options[0]}
                                                               
                                                            />
                                                        </div>
                                                    </>
                                                )

                                            })




                                    }



                                </div>
                            )


                        })

                }


            </div>
            <div><Footer /></div>
        </>
    );
}
