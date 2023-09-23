import React from "react";

// Remember to update this when changing userdefault.svg!
// FIXME: This should be dome automatically but well, jsx...
// https://stackoverflow.com/questions/59820954/syntaxerror-unknown-namespace-tags-are-not-supported-by-default
function Icon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="30"
      height="30"
      version="1.1"
      viewBox="0 0 10.583 10.583"
      xmlSpace="preserve"
    >
      <title>User profile, default icon</title>
      <g fill="#e7e7e7" fillOpacity="1">
        <circle
          cx="5.298"
          cy="3.527"
          r="2.64"
          strokeWidth="2.644"
          stopColor="#000"
        ></circle>
        <path
          strokeWidth="4.483"
          d="M7.51 5.578a2.991 2.991 0 01-2.174.94 2.991 2.991 0 01-2.174-.94A4.476 4.476 0 00.86 9.492a4.476 4.476 0 00.008.205h8.94a4.476 4.476 0 00.005-.205A4.476 4.476 0 007.51 5.578z"
          stopColor="#000"
        ></path>
      </g>
    </svg>
  );
}

export default Icon;
