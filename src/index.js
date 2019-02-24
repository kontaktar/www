// later on this will be replaced with an import, export of src/components/index.js

import React, { Fragment } from "react";
import ReactDOM from "react-dom";

import { Button, Card } from "components";
function App() {
  return (
    <Fragment>
      <Button />
      <Card />
    </Fragment>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));

console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
console.log(`NODE_ENV: ${process.env.TEST}`);
