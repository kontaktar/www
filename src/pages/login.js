/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from "react";
import { login } from "utils/auth";
import { MainLayout } from "layouts";
import { Button, Input } from "components";

const Login = () => {
  const [userData, setUserData] = useState({ username: "", error: "" });

  async function handleChange(event) {
    setUserData(
      Object.assign({}, userData, { [event.target.id]: event.target.value })
    );
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
          <Input
            type="text"
            id="username"
            name="username"
            value={userData.username}
            onChange={handleChange}
          />

          <label htmlFor="username">Enter password</label>
          <Input
            type="text"
            id="password"
            name="password"
            value={userData.password}
            onChange={handleChange}
          />

          <Button type="submit">Login</Button>

          <p className={`error ${userData.error && "show"}`}>
            {userData.error && `Error: ${userData.error}`}
          </p>
        </form>
      </div>
    </MainLayout>
  );
};

export default Login;
