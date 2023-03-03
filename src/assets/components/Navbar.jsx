import { Link } from "react-router-dom";
function Navbar() {
  const links=[
    {name:"Medicos", link:"#"},
    { name: "Pacientes", link: "#" },
    { name: "Consultas", link: "#" },
    { name: "Medicamentos", link: "/medicamentos" }
  ];

  return (
  <nav className="d-flex navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <a className="navbar-brand p-3" href="#">Modulo de gerenciamento </a>
      <button className="navbar-toggler mx-4" type="button" data-bs-toggle="collapse" data-bs-target="#menucollapse" aria-controls="menucollapse" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="menucollapse">
        <ul className="navbar-nav mr-auto d-lg-flex">
          {
            links.map(link =>{
              return <li className="nav-item m-3 m-lg-0">
                  <Link className="nav-link" to={link.link}>{link.name}</Link>
              </li>
            })
          }
          <li className="text-light nav-item dropdown bg-dark m-lg-0 mx-4 d-md-none">
            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Menu do usuario
            </a>
            <div className="dropdown-menu bg-dark border border-0"  aria-labelledby="navbarDropdown">
              <a className="dropdown-item" style={{ color: 'white' }} href="#">Sair</a>
            </div>
          </li>
        </ul>
      </div>
          <div className="menu-usuario mx-3 d-none d-lg-flex">
            <ul className="navbar-nav">
              <li className="text-light nav-item dropdown bg-dark m-lg-0 mx-4">
                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <i class="fa-solid fa-user"></i>
              </a>
              <div className="dropdown-menu bg-dark border border-0" aria-labelledby="navbarDropdown">
                <a className="dropdown-item" style={{ color: 'white' }} href="#">Sair</a>
              </div>
              </li>
            </ul>
          </div>
    </nav>
  );
}

export default Navbar;