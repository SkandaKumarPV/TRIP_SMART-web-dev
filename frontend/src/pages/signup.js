import React, { useState } from "react";
import axios from "axios";
import "./signup.css";

function SignUp({ switchToLogin }) {
    const initialValues = {
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
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
                await axios.post("http://localhost:5000/api/users/register", formValues);
                alert("Registration Successful!");
                switchToLogin(); // Navigate to Login after successful signup
            } catch (err) {
                setErrorMessage(err.response?.data?.error || "An error occurred");
            }
        }
    };

    const validate = (values) => {
        const errors = {};
        if (!values.username) errors.username = "Username is required!";
        if (!values.email) errors.email = "Email is required!";
        if (!values.password) errors.password = "Password is required!";
        if (values.password !== values.confirmPassword) errors.confirmPassword = "Passwords do not match!";
        return errors;
    };

    return (
        <div className="container">
            {errorMessage && <div className="ui error message">{errorMessage}</div>}
            <form onSubmit={handleSubmit}>
                <h1>Sign Up</h1>
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
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formValues.email}
                        onChange={handleChange}
                        placeholder="Email"
                    />
                </div>
                <p>{formErrors.email}</p>
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
                <div className="field">
                    <label>Confirm Password</label>
                    <input
                        type="password"
                        name="confirmPassword"
                        value={formValues.confirmPassword}
                        onChange={handleChange}
                        placeholder="Confirm Password"
                    />
                </div>
                <p>{formErrors.confirmPassword}</p>
                <button type="submit" className="ui button blue">Sign Up</button>
            </form>
            <div className="text">
                Already have an account?{" "}
                <button className="link-button" onClick={switchToLogin}>
                    Login
                </button>
            </div>
        </div>
    );
}

export default SignUp;
