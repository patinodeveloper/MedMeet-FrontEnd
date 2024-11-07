import { useState } from "react";
import { getDoctors } from "../api/services/doctorServices";
import { useEffect } from "react";
import { RowDoctorView } from "./RowDoctorView";

export const DoctorsView = ({ title }) => {

    const [doctors, setDoctors] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchDoctors = async () => {
        const doctors = await getDoctors();
        setDoctors(doctors);
        setIsLoading(false);
    };

    useEffect(() => {
        fetchDoctors();
    }, []);

    return (
        <>
            {
                isLoading && <div className="alert alert-info">Cargando...</div>
            }
            <h3 className="fs-5">{title}</h3>
            <table className="table table-striped table-hover">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Nombre</th>
                        <th>Apellidos</th>
                        <th>Correo</th>
                        <th>Especialidad</th>
                    </tr>
                </thead>
                <tbody>
                    {doctors.map(({ id, firstName, lastName, email, specialty }) => (
                        <RowDoctorView key={id} id={id} firstName={firstName} lastName={lastName}
                            email={email} specialty={specialty} />
                    ))}
                </tbody>
            </table>
        </>
    )
}