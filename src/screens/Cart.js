import React from 'react'
import { useCart, useDispatch } from '../components/ContextReducer'


export default function Cart() {
    let data = useCart();
    let dispatch = useDispatch();
    if (data.length === 0) {
      return (
        <div>
          <div className='m-5 w-100 text-light fs-3'>The Cart is Empty!</div>
        </div>
      )
    } 
    const handleCheckOut = async () => {
        // e.preventDefault();
        let userEmail = localStorage.getItem("userEmail");
        let response = await fetch("http://localhost:4000/api/OrderData", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                order_data: data,
                email: userEmail,
                order_date: new Date().toDateString()
            })
        });
        console.log("order Response", response)
        if (response.status === 200) {
            dispatch({ type: "DROP" })
        }
    }

    let totalPrice = data.reduce((total, food) => total + food.price, 0)
    return (

        <div className='container'>
            <table className="table table-striped table-dark">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Option</th>
                        <th scope="col">Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((food, index) => (
                        <tr>
                            <th scope='row'>{index + 1}</th>
                            <td>{food.name}</td>
                            <td>{food.qty}</td>
                            <td>{food.size}</td>
                            <td>{food.price}</td>
                            <td><button type="button" className='btn btn-danger' onClick={() => { dispatch({ type: "REMOVE", index: index }) }}>Delete</button></td>
                        </tr>

                    ))

                    }
                </tbody>
                <div><h1 className='fs-2'>Total Price: {totalPrice}/-</h1></div>
            </table>
            <button className='btn btn-success' onClick={handleCheckOut}>Check Out</button>
        </div>
    )
}
