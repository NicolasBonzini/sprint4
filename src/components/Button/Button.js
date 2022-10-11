import React from "react";

import deleteProduct from "../../utils/deleteProduct";

function Button(props) {
  return (
    <>
      <button
        onClick={props.handler}
        className={"btn_gray " + props.personalClass}
      >
        {props.text}
      </button>
    </>
  );
}

export default Button;
