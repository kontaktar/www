---
to: src/components/<%= name %>/<%= name %>.js
message: |
 - {green CREATED}: FUNCTIONAL COMPONENT @ src/components/<%= name %>/
---
import React from "react";
import PropTypes from "prop-types";
import styles from "./<%= name %>.module.scss";

const <%= name %> = () => {
  return (
    <div className={styles.<%= name.toLowerCase() %>}>
      <p><%= name %></p>
    </div>
  );
};

export default <%= name %>;

<%= name %>.propTypes = {
  className: PropTypes.string
};
<%= name %>.defaultProps = {
  className: ""
};
