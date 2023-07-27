import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
const navigate = useNavigate();

const Update = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [age, setAge] = useState("");
    const [error, setError] = useState("");
    const { id } = useParams();

    // 

    const getSingleUser = async () => {

        const response = await fetch(`http://localhost:3000/api/user/${id}`)

        const result = await response.json();

        if (!response.ok) {
            setError("Error Found Can't Delete")
        }
        else if (response.ok) {
            setName(result.name)
            setEmail(result.email)
            setAge(result.age)
            setError("");
        }
    }
}

// send userUpdated data

const handleUpdate = async (e) => {
    e.preventDefault();

    const handleUpdate = async (e) => {
        e.preventDefault();
        const updatedUser = { fname, email, age };
        console.log(updatedUser);
        const response = await fetch(`http://localhost:8000/edit/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedUser),
        });
        const result = await response.json();
        if (response.ok) {
            console.log("updated result..", result);
            setError("");
            navigate("/read");
        }
        if (!response.ok) {
            console.log(response.error);
            setError(response.error);
        }
    };

    useEffect(() => {
        getSingleUser();
    }, [])

    return (
        <div className="container my-2">
            {error && <div class="alert alert-danger" role="alert">
                {error}
            </div>}
            <h2 className="text-center">Edit The Data</h2>

            <form onSubmit={handleUpdate}>
                <div class="mb-3">
                    <label class="form-label">Name</label>
                    <input type="text" class="form-control" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div class="mb-3">
                    <label class="form-label">Email address</label>
                    <input type="email" class="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div class="mb-3">
                    <label class="form-label">Age</label>
                    <input type="number" class="form-control" value={age} onChange={(e) => setAge(e.target.value)} />
                </div>
                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Update;