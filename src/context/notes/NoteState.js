import React, { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
    const notesInitials = [
        {
            "_id": "63df8a8ae71a9179e1fafa2a",
            "user": "63db8730839f4eb6de4e2a6f",
            "title": "wanna make you mine UPDATED *******",
            "description": "How about a coffee UPDATED",
            "tag": "Be my girl",
            "date": "2023-02-05T10:52:58.001Z",
            "__v": 0
        },
        {
            "_id": "63df8d26a518b0a2da14550ed5",
            "user": "63db8730839f4eb6de4e2a6f",
            "title": "wanna make you mine",
            "description": "How about a coffee",
            "tag": "Be my girl",
            "date": "2023-02-05T11:04:06.034Z",
            "__v": 0
        },
        {
            "_id": "63df8d2689a518b0a2da140ed5",
            "user": "63db8730839f4eb6de4e2a6f",
            "title": "wanna make you mine",
            "description": "How about a coffee",
            "tag": "Be my girl",
            "date": "2023-02-05T11:04:06.034Z",
            "__v": 0
        },
        {
            "_id": "63df8d26a518b0hha2da140ed5",
            "user": "63db8730839f4eb6de4e2a6f",
            "title": "wanna make you mine",
            "description": "How about a coffee",
            "tag": "Be my girl",
            "date": "2023-02-05T11:04:06.034Z",
            "__v": 0
        },
        {
            "_id": "63df8d26a5h18b0a2da140ed5",
            "user": "63db8730839f4eb6de4e2a6f",
            "title": "wanna make you mine",
            "description": "How about a coffee",
            "tag": "Be my girl",
            "date": "2023-02-05T11:04:06.034Z",
            "__v": 0
        },
        {
            "_id": "63df8d26a518b0a2da17840ed5",
            "user": "63db8730839f4eb6de4e2a6f",
            "title": "wanna make you mine",
            "description": "How about a coffee",
            "tag": "Be my girl",
            "date": "2023-02-05T11:04:06.034Z",
            "__v": 0
        }
    ]
    const [notes, setNotes] =  useState(notesInitials);

    // Add a Note
    const addNote = (title, description, tag) =>{
        // API call
        console.log("Addeing a new note");
        const note = {
            "_id": "63df8d26a518b0a672da17840ed5",
            "user": "63db8730839f4eb6de4e2a6f",
            "title": title,
            "description": description,
            "tag": tag,
            "date": new Date(),
            "__v": 0
        }
        setNotes(notes.concat(note));
    }
    // Delete a Note
    const deleteNote = (id) =>{
        console.log("Deleting note with id: " + id);
        const newNotes = notes.filter((note)=>{return note._id !== id})
        setNotes(newNotes);
    }
    // Edit a Note
    const editNote = (id, title, description, tag) =>{
        
    }

    return (
        <NoteContext.Provider value={{notes, addNote, deleteNote, editNote}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;