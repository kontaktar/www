/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import Router from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { login } from "store/actions";
import { post } from "helpers/methods";
import useMaxWidth from "hooks/useMaxWidth";
import { Button, Input } from "components";
import styles from "./LoginFormContainer.module.scss";

const LoginFormContainer = () => {
  const dispatch = useDispatch();
  const store = useSelector((state) => state);

  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    const body = {
      userName: event.currentTarget.username.value,
      password: event.currentTarget.password.value
    };

    try {
      await post("/api/login", body).then(({ isLoggedIn }) => {
        if (isLoggedIn) {
          dispatch(login(body.userName)); // Get rid of auth store.
          Router.push("/profile");
        }
      });
    } catch (error) {
      setErrorMessage(`Something went wrong. ${error}`);
    }
  }
  return (
    <div>
      <div {...useMaxWidth()}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <Input
            type="text"
            id="username"
            label="Notendanafn"
            name="username"
          />
          <Input type="text" id="password" label="Lykilorð" name="password" />
          <p className={styles.error}>{errorMessage}</p>
          <Button
            className={styles.button}
            type="submit"
            modifier={["inverted"]}
          >
            Innskrá
          </Button>
          <span className={styles.or}>--- eða ---</span>
          <Link href="/register" as="/register">
            <Button className={styles.button}>Stofna aðgang</Button>
          </Link>
          {store.auth && store.auth.error && <p>Error {store.auth.error}</p>}
        </form>
      </div>
    </div>
  );
};

export default LoginFormContainer;

LoginFormContainer.propTypes = {
  className: PropTypes.string
};
LoginFormContainer.defaultProps = {
  className: ""
};
