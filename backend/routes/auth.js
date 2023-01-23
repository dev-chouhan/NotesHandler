const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWD_SECRET = "Harryisabadboy";

// Create a user using POST "/api/auth/createuser". No login requires
router.post("/createuser", [
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
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass,
        });

        const data = {
            user:{
                id: user.id
            }
        }

        const authToken = jwt.sign(data, JWD_SECRET);
        res.json(authToken);


    } catch (error) {
        console.error(error.message);
        res.status(500).send("nternal server error occured");
    }

});

// Authenticate a user using POST "/api/auth/login". No login requires
router.post("/login", [
    body('email', 'Enter a valid Email').isEmail(),
    body('password', 'Password can not be blank').exists(),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const {email, password} = req.body;
    try {
        // We will check either user email will be presented or not and if it is correct or not.
        let user = await User.findOne({email});
        if(!user){
            return res.status(400).json({error: "Please try to login in with correct credencials."});
        }
        const comparepassword = await bcrypt.compare(password, user.password); // returns either true or false;
        if(!comparepassword){
            return res.status(400).json({error: "Please try to login with correct credencials."});
        }
        const data = {
            user:{
                id: user.id,
            }
        };
        const authToken = jwt.sign(data, JWD_SECRET);
        res.send(authToken);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error occured");
    }
}
)

module.exports = router
