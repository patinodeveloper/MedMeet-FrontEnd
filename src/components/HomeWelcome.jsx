import { Link } from "react-router-dom"

export const HomeWelcome = () => {
    return (
        <>
            <h1 className="display-4 fw-bold" style={{ color: "var(--primary)" }}>
                ¡Bienvenido a MedMeet!
            </h1>
            <p className="lead mt-4" style={{ color: "var(--secundary)" }}>
                Simplifica la gestión de citas médicas, pacientes, doctores y horarios con nuestro sistema
                integral.
            </p>
            <hr className="my-4" />
            <p style={{ color: "var(--primary)" }}>
                Navega por las secciones de doctores, pacientes y citas desde el menú para comenzar.
            </p>
            <Link to="/doctors" className="btn btn-info btn-lg text-white fw-bold mt-3">
                Gestionar Doctores
            </Link>
        </>
    )
}                    