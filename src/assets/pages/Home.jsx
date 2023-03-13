import ScrollDown from "../components/ScrolDown";

function Home() {
  return (
    <div className="container-fluid">
      <section id="hero" className="p-3 container-fluid vh-100 align-items-center flex-column d-flex justify-content-center">
        <div className="h-75 d-flex flex-column align-items-center justify-content-end">
          <h1>Bem vindo ao Hospital Resilia</h1>
          <a href="/login" className="btn btn-secondary m-5 px-5" type="button">Login</a>
        </div>
        <div className="scroll-down h-25 d-flex flex-column justify-content-end">
          {//<ScrollDown nextSection={"#info"} />
          }
        </div>
      </section>

      <section id="info"></section>
    </div >
  );
}

export default Home;