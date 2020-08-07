import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Link from "next/link";
import PropTypes from "prop-types";
import { Button, Input } from "components";
import useMaxWidth from "hooks/useMaxWidth";
import { login } from "store/actions";
import styles from "./LoginFormContainer.module.scss";

const LoginFormContainer = () => {
  const dispatch = useDispatch();
  const store = useSelector((state) => state);

  const [userData, setUserData] = useState({ username: "", error: "" });

  async function handleChange(event) {
    setUserData(
      Object.assign({}, userData, { [event.target.id]: event.target.value })
    );
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setUserData(Object.assign({}, userData, { error: "" }));
    await dispatch(login(userData.username));
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
            value={userData.username}
            onChange={handleChange}
          />
          <Input
            type="text"
            id="password"
            label="Lykilorð"
            name="password"
            value={userData.password}
            onChange={handleChange}
          />
          <p className={`error ${userData.error && "show"}`}>
            {userData.error && `Error: ${userData.error}`}
          </p>
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
