import React, { useState } from "react";
import Link from "next/link";
import Router from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { login } from "store/actions";
import { post } from "helpers/methods";
import useMaxWidth from "hooks/useMaxWidth";
import { Button, Input } from "components";
import styles from "./LoginFormContainer.module.scss";

const LoginFormContainer = (): React.ReactElement => {
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
            name="username"
            placeholder="Notendanafn"
          />
          <Input
            type="password"
            id="password"
            name="password"
            placeholder="Lykilorð"
          />
          <p className={styles.error}>{errorMessage}</p>
          <Button className={styles.button} type="submit">
            Innskrá
          </Button>
          <span className={styles.or}>
            <span>eða</span>
          </span>

          <Link href="/register" as="/register">
            <Button className={styles.button} modifier={["inverted"]}>
              Stofna aðgang
            </Button>
          </Link>

          {store.auth && store.auth.error && <p>Error {store.auth.error}</p>}
        </form>
      </div>
    </div>
  );
};

export default LoginFormContainer;
