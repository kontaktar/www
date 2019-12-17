/* eslint-disable max-len */
/* eslint-disable react/prop-types */

import React from "react";

function User({ color, height, opacity, width }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width || "16"}
      height={height || "16"}
      fill="none"
      viewBox="0 0 16 16"
    >
      <path
        fill={color || "#000"}
        fillOpacity={opacity || "1"}
        d="M8 1c1.906 0 3.5 1.594 3.5 3.5C11.5 6.438 9.906 8 8 8a3.494 3.494 0 01-3.5-3.5C4.5 2.594 6.063 1 8 1zm4 10c1.625 0 3 1.375 3 3v1H1v-1c0-1.625 1.344-3 3-3 2.656 0 2.094.5 4 .5 1.875 0 1.313-.5 4-.5zM8 0C5.5 0 3.5 2.031 3.5 4.5 3.5 7 5.5 9 8 9c2.469 0 4.5-2 4.5-4.5C12.5 2.031 10.469 0 8 0zm4 10c-2.906 0-2.219.5-4 .5-1.781 0-1.125-.5-4-.5-2.219 0-4 1.813-4 4v1c0 .563.438 1 1 1h14c.531 0 1-.438 1-1v-1c0-2.188-1.813-4-4-4z"
      />
    </svg>
  );
}

export default User;
