import React, { useState } from "react";
import axios from "axios";

function Login(props) {
    const [cin, setCin] = useState("");
    const [password, setPassword] = useState("");

    const Submit = async (e) => {
        e.preventDefault();
        try {
            const resp = await axios.post("https://notes.devlop.tech/api/login", {
                cin,
                password,
            });
            console.log(resp.data);
            props.setisConect(true);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div>
            <form onSubmit={Submit}>
                <label htmlFor="cin">CIN</label>
                <br />
                <input
                    type="text"
                    id="cin"
                    value={cin}
                    onChange={(e) => {
                        setCin(e.target.value);
                    }}
                />
                <br />
                <br />
                <label htmlFor="password">Password</label>
                <br />
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value);
                    }}
                />
                <br />
                <br />
                <button type="submit" onClick={Submit}>
                    Login
                </button>
            </form>
        </div>
    );
}

export default Login;
