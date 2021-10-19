import React from "react";

const LastChange = ({ className, timestamp }) => {
  function addZeroBefore(n) {
    return (n < 10 ? "0" : "") + n;
  }
  return (
    <div className={className}>
      Síðast breytt: {addZeroBefore(timestamp.getHours())}:
      {addZeroBefore(timestamp.getMinutes())}:
      {addZeroBefore(timestamp.getSeconds())}
    </div>
  );
};
export default LastChange;
