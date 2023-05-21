import React, { useContext, useEffect, useRef, useState } from 'react';
import noteContext from "../context/notes/NoteContext";
import Noteitem from './Noteitem';
import Addnote from './Addnote';
import { useNavigate } from 'react-router-dom';

const Notes = (props) => {
    const { notes, getNotes, editNote } = useContext(noteContext);
    const [note, setNote] = useState({id:"", etitle:"", edescription:"", etag:""});
    let navigate = useNavigate();

    useEffect(() => {
        if(localStorage.getItem('auth-token')) {
            getNotes();
        } else {
            navigate("/login");
        }
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
        props.showAlert("Updated Successfully", "success");
    }
    return (
        <>
            <Addnote showAlert={props.showAlert}/>
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
                                    <label htmlFor="etitle" className="form-label">Title</label>
                                    <input type="text" className="form-control"  value={note.etitle}  onChange={onChange} id="etitle" name='etitle' minLength={5} required aria-describedby="emailHelp" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="edescription" className="form-label">Description</label>
                                    <input type="text" className="form-control" value={note.edescription} onChange={onChange} id="edescription" minLength={5} required name='edescription' />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="etag" className="form-label">Tag</label>
                                    <input type="text" className="form-control"  value={note.etag} onChange={onChange} id="etag" required name='etag' />
                                </div>
                            </form>

                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" ref={refClose} data-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" disabled={note.etitle.length<5 || note.edescription.length<5} onClick={handleClick}>Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row my-3">
                <h1>Your Notes</h1>
                <div className='container h6 mx-1'>
                    {notes.length === 0 && "No notes to display"}
                </div>
                {notes.map((note) => {
                    return <Noteitem key={note._id} updateNote={updateNote} showAlert={props.showAlert} note={note} />
                })}
            </div>
        </>
    )
}

export default Notes
