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
            "_id": "63df8d26a518b0a2da140ed5",
            "user": "63db8730839f4eb6de4e2a6f",
            "title": "wanna make you mine",
            "description": "How about a coffee",
            "tag": "Be my girl",
            "date": "2023-02-05T11:04:06.034Z",
            "__v": 0
        },
        {
            "_id": "63df8d26a518b0a2da140ed5",
            "user": "63db8730839f4eb6de4e2a6f",
            "title": "wanna make you mine",
            "description": "How about a coffee",
            "tag": "Be my girl",
            "date": "2023-02-05T11:04:06.034Z",
            "__v": 0
        },
        {
            "_id": "63df8d26a518b0a2da140ed5",
            "user": "63db8730839f4eb6de4e2a6f",
            "title": "wanna make you mine",
            "description": "How about a coffee",
            "tag": "Be my girl",
            "date": "2023-02-05T11:04:06.034Z",
            "__v": 0
        },
        {
            "_id": "63df8d26a518b0a2da140ed5",
            "user": "63db8730839f4eb6de4e2a6f",
            "title": "wanna make you mine",
            "description": "How about a coffee",
            "tag": "Be my girl",
            "date": "2023-02-05T11:04:06.034Z",
            "__v": 0
        },
        {
            "_id": "63df8d26a518b0a2da140ed5",
            "user": "63db8730839f4eb6de4e2a6f",
            "title": "wanna make you mine",
            "description": "How about a coffee",
            "tag": "Be my girl",
            "date": "2023-02-05T11:04:06.034Z",
            "__v": 0
        }
    ]
    const [notes, setNotes] =  useState(notesInitials);

    return (
        <NoteContext.Provider value={{notes, setNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;