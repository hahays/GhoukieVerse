import React from "react";

function ErrorMessage({ message }) {
  return (
    <p>
      <span>ERROR:</span>
      {message}
    </p>
  );
}

export default ErrorMessage;
