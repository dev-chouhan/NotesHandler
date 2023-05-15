import React, { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
    const host = "http://localhost:5000";
    const notesInitials = []
    const [notes, setNotes] =  useState(notesInitials);

    // Get all notes
    const getNotes = async() =>{
        // API calls
        const response = await fetch(`${host}/api/notes/fetchallnotes`,{
            method: 'GET',
            headers:{
                'Content-Type': 'application/json',
                'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNkYjg3MzA4MzlmNGViNmRlNGUyYTZmIn0sImlhdCI6MTY3NTMzMjk5M30.1i8E4o169PPr4MKOo5K4CwEev4yZvSlijjyyxSH05uE",
            }
        });
        const json = await response.json();
        console.log(json);
        setNotes(json);
    }

    // Add a Note
    const addNote = async(title, description, tag) =>{
        // API calls
        const response = await fetch(`${host}/api/notes/addnote`,{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
                'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNkYjg3MzA4MzlmNGViNmRlNGUyYTZmIn0sImlhdCI6MTY3NTMzMjk5M30.1i8E4o169PPr4MKOo5K4CwEev4yZvSlijjyyxSH05uE",
            },
            body: JSON.stringify({title, description, tag})
        });

        const note = await response.json();
        setNotes(notes.concat(note));
    }

    // Delete a Note
    const deleteNote = async(id) =>{
        // API calls
        const response = await fetch(`${host}/api/notes/deleteNote/${id}`,{
            method: 'DELETE',
            headers:{
                'Content-Type': 'application/json',
                'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNkYjg3MzA4MzlmNGViNmRlNGUyYTZmIn0sImlhdCI6MTY3NTMzMjk5M30.1i8E4o169PPr4MKOo5K4CwEev4yZvSlijjyyxSH05uE",
            },
        });
        const newNotes = notes.filter((note)=>{return note._id !== id})
        setNotes(newNotes);
    }

    // Edit a Note
    const editNote = async(id, title, description, tag) =>{
        // API calls
        const response = await fetch(`${host}/api/notes/updateNode/${id}`,{
            method: 'PUT',
            headers:{
                'Content-Type': 'application/json',
                'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNkYjg3MzA4MzlmNGViNmRlNGUyYTZmIn0sImlhdCI6MTY3NTMzMjk5M30.1i8E4o169PPr4MKOo5K4CwEev4yZvSlijjyyxSH05uE",
            },
            body: JSON.stringify({title, description, tag})
        });

        let newNotes = JSON.parse(JSON.stringify(notes)); // to create deep copy for notes
        // log in to edit the notes/files
        for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index];
            if(element._id === id){
                newNotes[index].title = title;
                newNotes[index].description = description;
                newNotes[index].tag = tag;
                break;
            }
        }
        setNotes(newNotes);
    }

    return (
        <NoteContext.Provider value={{notes, getNotes, addNote, deleteNote, editNote}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;