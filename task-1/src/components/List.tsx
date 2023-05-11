import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";

const List: React.FC = () => {
    const navigate = useNavigate();
    const [sortType, setSortType] = useState<string>("");
    const [search, setSearch] = useState<string>("");
    const [sortTitle, setSortTitle] = useState<boolean>(true);
    const [sortBody, setSortBody] = useState<boolean>(true);
    const [sortDC, setSortDC] = useState<boolean>(true);
    const [sortDM, setSortDM] = useState<boolean>(true);
    const [liList, setList] = useState<INote[]>(localStorage.notes && JSON.parse(localStorage.notes));
    useEffect(() => {
        if (!localStorage.notes) {
            let note: INote = {
                id: "1",
                title: "Note 1",
                body: "This is the first note",
                date_created: (new Date()).toLocaleString(),
                date_modified: ""
            };
            localStorage.setItem("notes", JSON.stringify([note]));
        } else {
            setList(JSON.parse(localStorage.notes));
        }
    }, []);
    const handleClick = (id: any) => {
        navigate(`/notes/${id}`);
    };
    const addNew = () => {
        navigate("/notes/new");
    };
    const handleDelete = (inx: number) => {
        try {
            liList?.splice(inx, 1);
            setList(liList);
            localStorage.setItem("notes", JSON.stringify(liList));
            navigate("/");
        } catch (error) {
            console.log(error);
        }
    };
    const setListBySearch = (text: string) => setSearch(text);
    const setSort = (a: string) => {
        setSortType(a);
        if (a === "title") setSortTitle(!sortTitle);
        else if (a === "body") setSortBody(!sortBody);
        else if (a === "date_created") setSortDC(!sortDC);
        else if (a === "date_modified") setSortDM(!sortDM);
    };
    const sortUI = () => {
        return ["Title", "Body", "Date Created", "Date Modified", ""].map((a) => (
            <div className="pointer" key={a} onClick={() => setSort(a.toLowerCase().replace(" ", '_'))}>
                {a !== "" ? a : "Remove Sorting"}
            </div>
        ));
    };
    const liUI = () => {
        try {
            if (liList?.length === 0)
                return <div className="note">No Data found</div>;
            let arr: INote[] | undefined = liList ? [...liList] : [];
            if (liList?.length > 0) {
                if (sortType === "title") {
                    sortTitle && arr?.sort((a, b) => a.title.localeCompare(b.title));
                    !sortTitle && arr?.sort((a, b) => b.title.localeCompare(a.title));
                } else if (sortType === "body") {
                    sortBody && arr?.sort((a, b) => a.body.localeCompare(b.body));
                    !sortBody && arr?.sort((a, b) => b.body.localeCompare(a.body));
                } else if (sortType === "date_created") {
                    sortDC && arr?.sort((a, b) => a.date_created.localeCompare(b.date_created));
                    !sortDC && arr?.sort((a, b) => b.date_created.localeCompare(a.date_created));
                } else if (sortType === "date_modified") {
                    sortDM && arr?.sort((a, b) => a.date_modified.localeCompare(b.date_modified));
                    !sortDM && arr?.sort((a, b) => b.date_modified.localeCompare(a.date_modified));
                } else arr = liList ? [...liList] : [];
            }
            if (search !== "" && liList?.length > 0)
                arr = arr?.filter(
                    (x) => x.title.includes(search) || x.body.includes(search)
                );
            return arr?.map((note, i) => (
                <li key={note.id} className="note">
                    <strong className="pointer" onClick={() => handleClick(note.id)}>
                        {note.title}
                    </strong>
                    <p className="text-fromat">{note.body}</p>
                    <div>
                        <small>Date Created:{note.date_created}</small>
                        {note.date_modified && <small>, Date Modified:{note.date_modified}</small>}
                    </div>
                    <div className="btn-group">
                        <button className="button3" onClick={() => handleClick(note.id)}>
                            View Details
                        </button>
                        <NavLink to={`/notes/edit/${note.id}`}>
                            <button className="button3">Edit Note</button>
                        </NavLink>
                        <button className="button1" onClick={() => handleDelete(i)}>
                            Delete Note
                        </button>
                    </div>
                </li>
            ));
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div className="note">
            <h2>Notes</h2>
            <div className="flex">
                <div className="dropdown">
                    <button className="dropbtn">Sort By</button>
                    <div className="dropdown-content">{sortUI()}</div>
                </div>
                <div className="rightDiv">
                    <button onClick={addNew}>Add</button>
                    <input
                        required
                        type="text"
                        id="search"
                        placeholder="search.."
                        value={search}
                        onChange={(e) => setListBySearch(e.target.value)}
                    />
                </div>
            </div>
            <ul>{liUI()}</ul>
        </div>
    );
};

export default List;
