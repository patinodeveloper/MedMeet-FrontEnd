export const HomeCards = () => {

    return (
        <>
            <div className="col-md-4 text-center">
                <div className="card border-0 shadow-sm">
                    <div className="card-body">
                        <h3 className="card-title" style={{ color: "var(--primary)" }}>
                            Doctores
                        </h3>
                        <p className="card-text" style={{ color: "var(--secundary)" }}>
                            Administra el equipo médico. Agrega, edita y visualiza información de los doctores.
                        </p>
                    </div>
                </div>
            </div>
            <div className="col-md-4 text-center">
                <div className="card border-0 shadow-sm">
                    <div className="card-body">
                        <h3 className="card-title" style={{ color: "var(--primary)" }}>
                            Pacientes
                        </h3>
                        <p className="card-text" style={{ color: "var(--secundary)" }}>
                            Lleva un registro de los pacientes y gestiona su información más relevante.
                        </p>
                    </div>
                </div>
            </div>
            <div className="col-md-4 text-center">
                <div className="card border-0 shadow-sm">
                    <div className="card-body">
                        <h3 className="card-title" style={{ color: "var(--primary)" }}>
                            Citas
                        </h3>
                        <p className="card-text" style={{ color: "var(--secundary)" }}>
                            Agenda y organiza citas médicas de manera rápida y eficiente.
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}