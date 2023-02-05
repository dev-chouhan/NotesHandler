const express = require("express");
const router = express.Router();
const Note = require("../models/Notes");
const fetchUser = require("../middleware/fetchUser");
const { body, validationResult } = require("express-validator"); //? to take valid input in name/email/password

// Route 1: get all the notes using: GET "/api/notes/fetchallnotes". Login required
router.get("/fetchallnotes", fetchUser, async (req, res) => {
    try{
        const notes = await Note.find({ user: req.user.id });
        res.json(notes);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error occured");
    }
});

// Route 2: add a new notes using: POST "/api/notes/addnote". Login required
router.post(
    "/addnote",
    fetchUser,
    [
        body("title", "Title must be atleast 3 character").isLength({ min: 3 }),
        body("description", "description must be atleast 5 character").isLength({min: 5}),
    ],
    async (req, res) => {
        try {
            const { title, description, tag } = req.body;
            // If there are errors, return bad request and the error
            const errors = validationResult(req); // errors will be a array
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const note = new Note({
                title,
                description,
                tag,
                user: req.user.id,
            });
            const savedNote = await note.save();
            res.json(savedNote);
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal server error occured");
        }
    }
);

// Route 3: update an existing note. Login required
router.put("/updateNode/:id", fetchUser, async(req, res)=>{
    const {title, description, tag} = req.body;
    // Create new note object
    const newNote = {};
    if(title){newNote.title = title};
    if(description){newNote.description = description};
    if(tag){newNote.tag = tag};

    // find note to be updated
    let note = await Note.findById(req.params.id);
    // if someone else trying to fetch someone's data
    if(!note){return res.status(404).send("Not Found")};
    // if current user trying to fetch other user data
    if(note.user.toString() !== req.user.id){
        return res.status(401).send("Not Allowed");
    }

    note = await Note.findByIdAndUpdate(req.params.id, {$set: newNote}, {new:true});
    res.json({note});
})

module.exports = router;
