import React, { useState } from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { login } from "store/actions";
import useUser from "lib/useUser";
import { post } from "helpers/methods";
import useMaxWidth from "hooks/useMaxWidth";
import { Button, Input } from "components";
import styles from "./LoginFormContainer.module.scss";

const LoginFormContainer = () => {
  const dispatch = useDispatch();
  const store = useSelector((state) => state);

  const { mutateUser } = useUser({
    redirectTo: "/profile",
    redirectIfFound: true
  });

  // eslint-disable-next-line no-unused-vars
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    const body = {
      userName: event.currentTarget.username.value,
      password: event.currentTarget.password.value
    };

    try {
      const { isLoggedIn } = await mutateUser(
        post("/api/login", body).catch((error) =>
          setErrorMessage(error.response.message)
        )
      );
      if (isLoggedIn) {
        dispatch(login(body.userName));
      }
    } catch (error) {
      setErrorMessage("Something went wrong");
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
          {/* <p className={`error ${userData.error && "show"}`}>
            {userData.error && `Error: ${userData.error}`}
          </p> */}
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
