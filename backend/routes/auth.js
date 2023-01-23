const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require('express-validator');

// Create a user using POST "/api/auth". No login requires
router.post("/", [
    body('name', 'Enter a valid Name!').isLength({ min: 3 }),
    body('email', 'Enter a valid Email!').isEmail(),
    body('password', 'Enter a valid Password!').isLength({ min: 5 }),
], async (req, res) => {
    console.log(req.body);
    // If there are errors, return bad request and the error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    // Check whether the user with this email exists already.
    try {
        let user = await User.findOne({ email: req.body.email }); // js will wait for promise to return.
        if (user) {
            return res.status(400).json({ error: "Sorry, user with this email is already registered." });
        }
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        })
        res.json(user)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occured");
    }

});

module.exports = router
