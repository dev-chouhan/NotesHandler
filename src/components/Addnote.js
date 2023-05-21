import React, { useState , useContext} from 'react'
import noteContext from "../context/notes/NoteContext";

const Addnote = (props) => {
    const { addNote } = useContext(noteContext);
    const [note, setNote] = useState({title:"", description:"", tag:""})
    const handleClick = (e) => {
        e.preventDefault(); // to prevent page from reload
        addNote(note.title, note.description, note.tag); // providing title and dsecription to newly added note
        setNote({title:" ", description:" ", tag:""});
        props.showAlert("Added Successfully", "success");
    }
    const onChange = (e) => {
        setNote({...note, [e.target.name]: e.target.value})
    }

    return (
        <div className="container my-3">
            <h1>Add a Note</h1>
            <form>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" onChange={onChange} id="title" name='title' value={note.title} minLength={5} required  aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control"  onChange={onChange} id="description" value={note.description} minLength={5} required  name='description' />
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control"  onChange={onChange} id="tag" value={note.tag} minLength={2} required  name='tag' />
                </div>
                
                <button type="submit" className="btn btn-primary" disabled={note.title.length<5 || note.description.length<5} onClick={handleClick}>Add Note</button>
            </form>
        </div>
    )
}

export default Addnote
