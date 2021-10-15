import React from "react";

function IconButton({ submit, handleClick, children, ...props }) {
  return (
    <button
      type={submit ? "submit" : "button"}
      className="btn btn-light p-1"
      onClick={handleClick}
      {...props}
    >
      {children}
    </button>
  );
}

export default IconButton;
