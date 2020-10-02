/* eslint-disable max-len */
import React from "react";

// eslint-disable-next-line react/prop-types
const SvgSearch = ({ width = 16, height = 17, fill = "#cccccc" }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 16 17"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M15.875 15.0625L11.8438 11.0312C11.7812 10.9688 11.6875 10.9375 11.5938 10.9375H11.25C12.3438 9.75 13 8.21875 13 6.5C13 2.9375 10.0625 0 6.5 0C2.90625 0 0 2.9375 0 6.5C0 10.0938 2.90625 13 6.5 13C8.1875 13 9.75 12.3438 10.9062 11.2812V11.5938C10.9062 11.7188 10.9375 11.8125 11 11.875L15.0312 15.9062C15.1875 16.0625 15.4062 16.0625 15.5625 15.9062L15.875 15.5938C16.0312 15.4375 16.0312 15.2188 15.875 15.0625ZM6.5 12C3.4375 12 1 9.5625 1 6.5C1 3.46875 3.4375 1 6.5 1C9.53125 1 12 3.46875 12 6.5C12 9.5625 9.53125 12 6.5 12Z"
      fill={fill}
    />
  </svg>
);

export default SvgSearch;
