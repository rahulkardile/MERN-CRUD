import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Read = () => {

    const [data, setData] = useState();
    const [error, setError] = useState("");

    async function getData() {

        const response = await fetch("http://localhost:3000/api/user");
        const result = await response.json();

        if (!response.ok) {
            console.log(result.error);
            setError(result.error)
        }
        else if (response.ok) {
            setData(result);
        }
    }

    const handleDelete = async (id)=>{

        const response = await fetch(`http://localhost:3000/api/user/${id}`, {
            method: "DELETE"
        });

        const result = await response.json();

        if (!response.ok) {
            setError("Error Found Can't Delete")
        }
        else if (response.ok) {
            setError("Delete Successfully!");

            setTimeout(()=>{
                setError("");
                getData();
            }, 1000);
        }
    }

    

    useEffect(() => {
        getData();
    }, [])

    return (
        <div className="container my-2">
        {error && <div class="alert alert-danger" role="alert">
                {error}
            </div>}
            <h2 className="text-center">Every Thing That You Need Is Here</h2>
            <div className="row">
                {data?.map((ele) => (
                    <div key={ele._id} className="col-3 p-3">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">{ele.name}</h5>
                                <h6 className="card-subtitle mb-2 text-body-secondary">{ele.email}</h6>
                                <p className="card-text">age {ele.age}</p>
                                <Link to={`/${ele._id}`} className="card-link">Edit</Link>
                                <a className="card-link" onClick={()=> handleDelete(ele._id)}>Delete</a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Read;