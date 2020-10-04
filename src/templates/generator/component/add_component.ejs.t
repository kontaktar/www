---
to: src/components/<%= name %>/<%= name %>.tsx
message: |
 - {green CREATED}: FUNCTIONAL COMPONENT @ src/components/<%= name %>/
---
import React from "react";
import styles from "./<%= name %>.module.scss";

type Props = {
  children: React.ReactNode;
};

const <%= name %> = ({ children }: Props) => {
  return (
    <div className={styles.<%= name.toLowerCase() %>}>
      {children}
    </div>
  );
};

export default <%= name %>;
