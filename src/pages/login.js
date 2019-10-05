/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from "react";
import { MainLayout } from "../layouts";
import { login, isLoggedIn } from "../utils/auth";

const Login = () => {
  const [userData, setUserData] = useState({ username: "", error: "" });

  async function handleChange(event) {
    setUserData(Object.assign({}, userData, { username: event.target.value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setUserData(Object.assign({}, userData, { error: "" }));
    login({ username: userData.username });
  }

  return (
    <MainLayout>
      <div className="login">
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Enter username</label>
          {isLoggedIn()}
          <input
            type="text"
            id="username"
            name="username"
            value={userData.username}
            onChange={handleChange}
          />

          <button type="submit">Login</button>

          <p className={`error ${userData.error && "show"}`}>
            {userData.error && `Error: ${userData.error}`}
          </p>
        </form>
      </div>
      <style jsx>{`
        .login {
          max-width: 340px;
          margin: 0 auto;
          padding: 1rem;
          border: 1px solid #ccc;
          border-radius: 4px;
        }
        form {
          display: flex;
          flex-flow: column;
        }
        label {
          font-weight: 600;
        }
        input {
          padding: 8px;
          margin: 0.3rem 0 1rem;
          border: 1px solid #ccc;
          border-radius: 4px;
        }
        .error {
          margin: 0.5rem 0 0;
          display: none;
          color: brown;
        }
        .error.show {
          display: block;
        }
      `}</style>
    </MainLayout>
  );
};

export default Login;
