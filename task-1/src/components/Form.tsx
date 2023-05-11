import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Form: React.FC = () => {
    const [title, setTitle] = useState<string>("");
    const [body, setBody] = useState<string>("");
    const [edit, setEdit] = useState<boolean>(false);
    const [index, setEditIndex] = useState<number>(0);
    const navigate = useNavigate();
    useEffect(() => {
        if (window.location.href.includes("edit")) {
            let notes: INote[] = JSON.parse(localStorage.notes);
            let id = window.location.href.split("edit/")[1];
            if (id) {
                let idx = notes?.findIndex((x) => x.id === id);
                let item = notes[idx];
                setTitle(item.title);
                setBody(item.body);
                setEditIndex(idx);
                setEdit(true);
            }
        } else setEdit(false);
    }, []);
    const handleSubmit = (e: React.FormEvent) => {
        try {
            e.preventDefault();
            let notes: INote[] = JSON.parse(localStorage.notes);
            let id = notes[index] ? notes[index].id : "1";
            const newNote: INote = { id: id, title, body, date_created: "", date_modified: "" };
            if (edit) {
                newNote.date_created = notes[index]?.date_created;
                newNote.date_modified = (new Date()).toLocaleString();
                notes[index] = newNote;
            }
            else {
                newNote.date_created = (new Date())?.toLocaleString();
                let id1 = notes.length > 0 ? notes[notes.length - 1]?.id : "0";
                newNote.id = (parseInt(id1) + 1).toString();
                notes.push(newNote);
            }
            localStorage.setItem("notes", JSON.stringify(notes));
            setTitle("");
            setBody("");
            navigate("/");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="note center">
            <h2>{`${edit ? "Edit" : "Create"} Note`}</h2>
            <form onSubmit={handleSubmit}>
                <div className="input-div">
                    <label htmlFor="title">Title:</label>
                    <input
                        required
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className="input-div">
                    <label htmlFor="body">Body:</label>
                    <textarea
                        required
                        id="body"
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                    />
                </div>
                <div className="btn-group">
                    <button type="submit" className="button2">
                        Save Note
                    </button>
                    <NavLink to="/">
                        <button className="button3">Back</button>
                    </NavLink>
                </div>
            </form>
        </div>
    );
};

export default Form;
