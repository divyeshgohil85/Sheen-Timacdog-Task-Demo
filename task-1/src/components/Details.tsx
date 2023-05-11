import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Details: React.FC = () => {
    const navigate = useNavigate();
    const [index, setIndex] = useState<number>(-1);
    const [item, setItem] = useState<INote>();
    useEffect(() => {
        if (window.location.href.includes("notes")) {
            let notes: INote[] = localStorage.notes && JSON.parse(localStorage.notes);
            let id = window.location.href.split("notes/")[1];
            if (id) {
                let idx = notes?.findIndex((x) => x.id === id);
                setIndex(idx);
                setItem(notes[idx]);
            }
        }
    }, []);

    const handleDelete = () => {
        try {
            let arr: INote[] = JSON.parse(localStorage.notes);
            arr?.splice(index, 1);
            localStorage.setItem("notes", JSON.stringify(arr));
            navigate("/");
        } catch (error) {
            console.log(error);
        }
    };
    if (!item) {
        return <div>Note not found</div>;
    }
    return (
        <div className="note">
            <h4>Note Details</h4>
            <h5>{item.title}</h5>
            <p>{item.body}</p>
            <div className="btn-group">
                <button className="button1" onClick={handleDelete}>
                    Delete Note
                </button>
                <NavLink to={`/notes/edit/${item.id}`}>
                    <button className="button3">Edit Note</button>
                </NavLink>
                <NavLink to="/">
                    <button className="button2">Back to Home</button>
                </NavLink>
            </div>
        </div>
    );
};

export default Details;
