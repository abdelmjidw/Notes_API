import axios from "axios";
import React, { useEffect, useState } from "react";

function NotesList() {
    const [notes, setNotes] = useState([]);
    const [userName, setUserName] = useState("");
    const [userLast, setLast]= useState("")
    useEffect(() => {
        fetchNotes();
        const storedName = localStorage.getItem("first");
        const storedlast = localStorage.getItem("last");
        if (storedName && storedlast) {
            setUserName(storedName); 
            setLast(storedlast);
        }
    }, []);

    const fetchNotes = async () => {
        try {
            const token = localStorage.getItem('token');
            console.log('Token:', token);
            const resp = await axios.get('https://notes.devlop.tech/api/notes', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            console.log(resp.data);
            setNotes(resp.data);
        } catch (err) {
            console.error("Error fetching notes:", err.response ? err.response.data : err.message);
            alert("Failed to fetch notes. Please try again.");
        }
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Notes List</h1>
            <h4>Welcome, {userName} {userLast}</h4> 
            {notes.length > 0 ? (
                <table className="table table-striped table-bordered">
                    <thead className="table-dark">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Title</th>
                            <th scope="col">Content</th>
                            <th>Events</th>
                        </tr>
                    </thead>
                    <tbody>
                        {notes.map((note, index) => (
                            <tr key={index}>
                                <th scope="row">{index + 1}</th>
                                <td>{note.title}</td>
                                <td>{note.content}</td>
                                <td>
                                <div className="d-flex justify-content-start gap-1">
                                        <button className="btn btn-success mr-2 " onClick={() => alert("Update functionality coming soon!")}>Update</button>
                                        <button className="btn btn-danger" onClick={() => alert("Delete functionality coming soon!")}>Delete</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p className="text-center text-muted">No notes available.</p>
            )}
        </div>
    );
}

export default NotesList;
