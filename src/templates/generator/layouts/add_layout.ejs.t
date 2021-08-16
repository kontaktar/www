---
to: src/layouts/<%= name %>/<%= name %>.tsx
message: |
 - {green CREATED}: LAYOUT @ src/layouts/<%= name %>/
---
import React, { ReactElement } from "react";
import styles from "./<%= name %>.module.scss";

type Props = {
  className?: string;
};

const <%= name %> = ({ className = "" }: Props): ReactElement => {
  return (
    <div className={styles.<%= name.toLowerCase() %>}>
      <p><%= name %></p>
    </div>
  );
};

export default <%= name %>;
