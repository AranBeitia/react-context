import React from "react";
import cn from "clsx";

function Button({
  submitButton,
  disabled = false,
  block = false,
  small = false,
  children,
  ...props
}) {
  const classes = cn({
    btn: true,
    "btn-primary": true,
    "btn-block": block,
    "btn-sm": small,
  });

  return (
    <button
      className={classes}
      type={submitButton ? "submit" : "button"}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
