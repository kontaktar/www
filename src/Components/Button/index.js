import React from "react";
import styles from "./index.scss";

class Button extends React.Component {
  render() {
    return (
      <div className={styles.button}>
        <h2>Button component</h2>
      </div>
    );
  }
}

export default Button;
