import React from "react";
import { useRouteError } from "react-router-dom";
import './style.scss';

export default function Error() {
  const error = useRouteError();
  console.log(error);

  return (
    <div className="error">
      <h1>An error occurred!</h1>
      <p>{error.message}</p>
      <a href="/">Go to homepage</a>
    </div>
  );
}
