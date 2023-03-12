import { useRef, useState } from "react";

function Alert({ content, className }) {
  const myref = useRef(null);
  return (
    <>
      {
        (content) &&
        <div ref={myref} className={`${className} alert alert-${content.variant}`}>{content.mensagem}</div>
      }
    </>
  );
}

export default Alert;