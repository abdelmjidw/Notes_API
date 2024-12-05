import React, { useState } from "react";
import axios from "axios";
import { Alert } from "react-bootstrap";

function Login(props) {
    const [cin, setCin] = useState("");
    const [password, setPassword] = useState("");
    const [Forgeted, setForgeted] = useState(false);

    const Submit = async (e) => {
        e.preventDefault();
        try {
            const resp = await axios.post("https://notes.devlop.tech/api/login", {
                cin,
                password,
            });
            console.log(resp.data);
            localStorage.setItem("token", resp.data.token);
            localStorage.setItem("first", resp.data.user.first_name);
            localStorage.setItem("last", resp.data.user.last_name);
            props.setisConect(true);
        } catch (err) {
            console.error("Login error:", err.response ? err.response.data : err.message);
            alert("Login failed. Please check your credentials.");
        }
    };

    const Forget = () => {
        !Forgeted?setForgeted(true):setForgeted(false);
    };

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="card p-4 shadow" style={{ width: "25rem" }}>
                <h3 className="text-center mb-4">Login</h3>
                <form onSubmit={Submit}>
                    <div className="mb-3">
                        <label htmlFor="cin" className="form-label">
                            CIN
                        </label>
                        <input
                            type="text"
                            id="cin"
                            className="form-control"
                            value={cin}
                            onChange={(e) => setCin(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100">
                        Login
                    </button>
                </form>
                <a href="#" className="text-center mt-2" onClick={Forget}>
                {!Forgeted ? "Forget Password" : "Safi tfkrto"}
                </a>
                {Forgeted && (
                    <Alert variant="success" className="mt-3 text-center">
                        JAREB 123456 ILA MSD9ATCH M3NDI MNDIR LIK
                    </Alert>
                )}
            </div>
        </div>
    );
}

export default Login;
