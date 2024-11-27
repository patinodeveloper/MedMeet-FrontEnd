export const MainNavBar = () => {

    return (
        <>
            <nav className="navbar navbar-expand-lg bg-primary-subtle">
                <div className="mx-5 container-fluid">
                    <a className="navbar-brand fs-3 fw-medium text-info-emphasis me-5" href="#">MedMeet</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav fs-5 fw-medium">
                            <li className="nav-item">
                                <a className="nav-link text-black" aria-current="page" href="#">Inicio</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link text-black" href="#">Doctores</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link text-black" href="#">Pacientes</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link text-black" href="#">Citas</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}