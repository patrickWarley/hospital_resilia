import { useRef, useState } from "react";

function Alert({ content, className }) {
  const myref = useRef(null);

  setTimeout(() => myref.current.classList.add('d-none'), 3000);

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