function Alert(content){
  return(
    <>
    { content&&
      <div className={`alert alert-${content.variant}`}>{content.mensagem}</div>
    }
    </>
  );
}

export default Alert;