import React from "react";
import styles from "./Button.module.scss";

class Button extends React.Component {
  render() {
    return (
      <div className={styles.button}>
        <p>Hello World!</p>
      </div>
    );
  }
}

export default Button;
