const express = require("express")
const mongoose = require("mongoose")
const User = require("../models/userModels")

const router = express.Router();

//  add users

router.post('/', async (req, res) => {

    const { name, email, age } = req.body;

    try {
        const userData = await User.create({
            name: name,
            email: email,
            age: age
        })
        res.status(201).json(userData);
    } catch (error) {
        console.log({ error: error.massage });
        res.status(400).json({ error: error.massage })
    }

})

//  get all users

router.get("/", async(req, res) => {
    try {
        const showAll = await User.find();
        res.status(200).json(showAll);
    } catch (error) {
        res.send(400).json({error:error.massage})
    }
})

// get single user

router.get("/:id", async (req, res) => {
    const {id} = req.params;
    try {
        const showOneUser = await User.findById({_id: id});
        res.status(200).json(showOneUser);
    } catch (error) {
        console.log(error)
        res.status(400).json({error:error.massage});
    }
})

// delete single user

router.delete("/:id", async(req, res) => {
    const {id} = req.params;
    try {
        const singleUser = await User.findByIdAndDelete({_id: id});
        res.status(200).json(singleUser);
    } catch (error) {
        res.status(400).json({error: error.massage});
    }
})

// update user 

router.patch("/:id", async(req, res) => {
    const { id } = req.params;
    const {name, email, age} = req.body;
    try {
        const updateUser = await User.findByIdAndUpdate(id, req.body, {
            new: true,
        })
        res.status(200).json(updateUser)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
})

module.exports = router;