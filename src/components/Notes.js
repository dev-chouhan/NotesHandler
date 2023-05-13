import React, { useContext, useEffect, useRef, useState } from 'react';
import noteContext from "../context/notes/NoteContext";
import Noteitem from './Noteitem';
import Addnote from './Addnote';

const Notes = () => {
    const { notes, getNotes, editNote } = useContext(noteContext);
    const [note, setNote] = useState({id:"", etitle:"", edescription:"", etag:""});

    useEffect(() => {
        getNotes();
    }, []);
    const ref = useRef(null);
    const refClose = useRef(null);
    const updateNote = (currentNote) => {
        setNote({id:currentNote._id, etitle:currentNote.title, edescription:currentNote.description, etag:currentNote.tag});
        ref.current.click();
    }

    const onChange = (e) => {
        setNote({...note, [e.target.name]: e.target.value})
    }
    const handleClick = (e) => {
        // e.preventDefault(); // to prevent page from reload
        editNote(note.id, note.etitle, note.edescription, note.etag);
        // console.log("updating the note...", note)
        refClose.current.click();
    }
    return (
        <>
            <Addnote />
            {/* <!-- Button trigger modal --> */}
            <button ref={ref} type="button" className="btn btn-primary d-none" data-toggle="modal" data-target="#exampleModal">
                Launch demo modal
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">

                            <form>
                                <div className="mb-3">
                                    <label htmlFor="etitle" className="form-label" value={note.etitle} >Title</label>
                                    <input type="text" className="form-control" onChange={onChange} id="etitle" name='etitle' required aria-describedby="emailHelp" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="edescription" className="form-label" value={note.edescription}>Description</label>
                                    <input type="text" className="form-control" onChange={onChange} id="edescription" required name='edescription' />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="etag" className="form-label" value={note.etag}>Tag</label>
                                    <input type="text" className="form-control" onChange={onChange} id="etag" required name='etag' />
                                </div>
                            </form>

                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" ref={refClose} data-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={handleClick}>Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row my-3">
                <h1>Your Notes</h1>
                {notes.map((note) => {
                    return <Noteitem key={note._id} updateNote={updateNote} note={note} />
                })}
            </div>
        </>
    )
}

export default Notes
