import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { useRouter } from "next/router";
import Link from "next/link";
import PropTypes from "prop-types";
import { Button, Input } from "components";
import useMaxWidth from "hooks/useMaxWidth";
// import { login } from "store/actions";

import { login } from "store/actions";
import fetchJson from "../../lib/fetchJson";
import useUser from "../../lib/useUser";
import styles from "./LoginFormContainer.module.scss";

const LoginFormContainer = () => {
  const dispatch = useDispatch();
  const store = useSelector((state) => state);

  const { mutateUser } = useUser({
    redirectTo: "/profile",
    redirectIfFound: true
  });

  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    const body = {
      username: event.currentTarget.username.value,
      password: event.currentTarget.username.value
    };

    try {
      await mutateUser(
        fetchJson("/api/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body)
        })
      );
    } catch (error) {
      setErrorMessage(error.data.message);
      setErrorMessage(error);
    } finally {
      dispatch(login(body.username));
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
            // value={userData.username}
            // onChange={handleChange}
          />
          <Input
            type="text"
            id="password"
            label="Lykilorð"
            name="password"
            // value={userData.password}
            // onChange={handleChange}
          />
          {/* <p className={`error ${userData.error && "show"}`}>
            {userData.error && `Error: ${userData.error}`}
          </p> */}
          <p>{errorMessage}</p>
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
