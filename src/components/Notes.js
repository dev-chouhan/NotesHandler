import React, {useContext} from 'react';
import context from "../context/notes/NoteContext";
import Noteitem from './Noteitem';

const Notes = () => {
    const  {notes, setNotes} = useContext(context);
    return (
        <div className="row my-3">
            <h1>Your Notes</h1>
            {notes.map((note) => {
                return <Noteitem note={note}/>
            })}
        </div>
    )
}

export default Notes
