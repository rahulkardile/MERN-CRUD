import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Create = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [age, setAge] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    console.log(name, email, age);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const addUser = { name, email, age };

        const response = await fetch("http://localhost:3000/api/user", {
            method: "POST",
            body: JSON.stringify(addUser),
            headers: {
                "Content-Type": "application/json",
            },
        });
        const result = response.json();

        if (!response.ok) {
            console.log(result.error);
            setError("Enter Another Email Id!")
        }
        else if (response.ok) {
            console.log(result);
            setName("")
            setEmail("")
            setAge("")
            setError("");
            navigate("/all")
        }
    }

    return (
        <div className="container my-2">
            {error && <div class="alert alert-danger" role="alert">
                {error}
            </div>}
            <h2 className="text-center">Enter The Data</h2>

            <form onSubmit={handleSubmit}>
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

export default Create;