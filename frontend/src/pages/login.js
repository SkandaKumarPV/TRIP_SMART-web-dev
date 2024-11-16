import React, { useState } from "react";
import axios from "axios";
import "./signup.css";

function Login({ switchToSignup }) {
    const initialValues = {
        username: "",
        password: "",
    };

    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [errorMessage, setErrorMessage] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errors = validate(formValues);
        setFormErrors(errors);

        if (Object.keys(errors).length === 0) {
            try {
                const response = await axios.post("http://localhost:5000/api/users/login", formValues);
                localStorage.setItem("authToken", response.data.token);
                alert("Login Successful!");
            } catch (err) {
                setErrorMessage(err.response?.data?.error || "An error occurred");
            }
        }
    };

    const validate = (values) => {
        const errors = {};
        if (!values.username) errors.username = "Username is required!";
        if (!values.password) errors.password = "Password is required!";
        return errors;
    };

    return (
        <div className="container">
            {errorMessage && <div className="ui error message">{errorMessage}</div>}
            <form onSubmit={handleSubmit}>
                <h1>Login</h1>
                <div className="field">
                    <label>Username</label>
                    <input
                        type="text"
                        name="username"
                        value={formValues.username}
                        onChange={handleChange}
                        placeholder="Username"
                    />
                </div>
                <p>{formErrors.username}</p>
                <div className="field">
                    <label>Password</label>
                    <input
                        type="password"
                        name="password"
                        value={formValues.password}
                        onChange={handleChange}
                        placeholder="Password"
                    />
                </div>
                <p>{formErrors.password}</p>
                <button type="submit" className="ui button blue">Login</button>
            </form>
            <div className="text">
                Don't have an account?{" "}
                <button className="link-button" onClick={switchToSignup}>
                    Sign Up
                </button>
            </div>
        </div>
    );
}

export default Login;
