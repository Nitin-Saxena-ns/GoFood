import React, { useState, useRef, useEffect } from 'react'
import { useDispatch, useCart } from './ContextReducer';

export default function Card(props) {
    let data = useCart();
    const priceRef = useRef();
    let dispatch = useDispatch();
    let options = props.options;
    let priceOptions = Object.keys(options);
    const [qty, setQty] = useState(1);
    const [size, setSize] = useState("");


    const handleAddToCart = async () => {
        let food = [];
        for (const item of data) {
            if (item.id === props.foodItems._id) {
                food = item;

                break;
            }
        }
        if (food !== []) {
            if (food.size === size) {
                await dispatch({ type: "UPDATE", id: props.foodItems._id, price: finalprice, qty: qty })
                return

            } 
            else if (food.size !== size) {
                await dispatch({ type: "ADD", id: props.foodItems._id, name: props.foodItems.name, price: finalprice, qty: qty, size: size, img: props.foodItems.img })
                // console.log(data);
                return
            }
            return
        }
        await dispatch({ type: "ADD", id: props.foodItems._id, name: props.foodItems.name, price: finalprice, qty: qty, size: size, img: props.foodItems.img })
        // console.log(data);


    }
    let finalprice = qty * parseInt(options[size]);
    useEffect(() => {
        setSize(priceRef.current.value)
    }, [])
    return (
        <>
            <div className="card m-3" style={{ "width": "18rem" }}>
                <img src={props.foodItems.img} className="card-img-top" alt="..." style={{ height: "150px", objectFit: "fill" }} />
                <div className="card-body">
                    <h5 className="card-title">{props.foodItems.name}</h5>

                    <div className="container">
                        <select className="m-2 h-100 bg-success-rounded" onChange={(e) => setQty(e.target.value)}>
                            {Array.from(Array(6), (e, i) => {
                                return (
                                    <option key={i + 1} value={i + 1}>{i + 1}</option>
                                )
                            })
                            }
                        </select>
                        <select className="m-2 h-100 bg-success-rounded" ref={priceRef} onChange={(e) => setSize(e.target.value)}>

                            {
                                priceOptions.map((data) => {
                                    return (
                                        <option key={data} value={data}>{data}</option>
                                    )
                                })
                            }
                        </select>
                        <div className="d-inline h-100 fs-5">
                            ₹{finalprice}/-
                        </div>
                        <hr />
                        <button className="btn btn-success justify-center ms-2" onClick={handleAddToCart}>Add To Cart</button>
                    </div>
                </div>
            </div>
        </>
    )
}
