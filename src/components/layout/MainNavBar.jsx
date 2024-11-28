import { Link } from "react-router-dom";

export const MainNavBar = () => {
    return (
        <>
            <nav className="navbar navbar-expand-lg bg-primary-subtle">
                <div className="mx-5 container-fluid">
                    <Link className="navbar-brand fs-3 fw-medium text-info-emphasis me-5" to="/">MedMeet</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav fs-5 fw-medium">
                            {/* Link para manejar la navegación sin recargar la página */}
                            <li className="nav-item">
                                <Link className="nav-link text-black" to="/">Inicio</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link text-black" to="/doctors">Doctores</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link text-black" to="/patients">Pacientes</Link>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link text-black" href="#">Citas</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link text-black" href="#">Especialidades</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
};
