/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable max-len */
import React from "react";

const SvgEmail = props => (
  <svg
    width="24"
    height="17"
    viewBox="0 0 24 17"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M21.8906 0H2.10938C0.948656 0 0 0.944484 0 2.10938V14.7656C0 15.9309 0.949266 16.875 2.10938 16.875H21.8906C23.0513 16.875 24 15.9305 24 14.7656V2.10938C24 0.944203 23.0509 0 21.8906 0ZM21.5667 1.40625C20.8847 2.09048 12.874 10.1273 12.5449 10.4575C12.27 10.7332 11.7301 10.7334 11.4551 10.4575L2.43328 1.40625H21.5667ZM1.40625 14.5071V2.36789L7.45617 8.4375L1.40625 14.5071ZM2.43328 15.4688L8.44894 9.4335L10.4592 11.4503C11.283 12.2768 12.7174 12.2764 13.5409 11.4503L15.5511 9.43355L21.5667 15.4688H2.43328ZM22.5938 14.5071L16.5438 8.4375L22.5938 2.36789V14.5071Z"
      fill={props.color || "white"}
    />
  </svg>
);

export default SvgEmail;
