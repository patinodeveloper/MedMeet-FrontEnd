import { useContext, useEffect } from "react";
import DataTable from "react-data-table-component"
import { DoctorContext } from "../context/DoctorContext";
import { ActionButtons } from "./ActionButtons";

export const DoctorsList = () => {
    const { doctors = [] } = useContext(DoctorContext);

    const columns = [
        { name: "ID", selector: row => row.id, sortable: true, width: "80px" },
        { name: "Nombre", selector: row => row.firstName, sortable: true },
        { name: "Apellidos", selector: row => row.lastName, sortable: true },
        { name: "Correo", selector: row => row.email, sortable: true, width: "280px" },
        { name: "Especialidad", selector: row => row.specialty.name, sortable: true, width: "160px" },
        {
            name: "Acciones",
            cell: doctor => <ActionButtons doctor={doctor} />, // pasar doctor
            width: "130px"
        }
    ];

    const customStyles = {
        headCells: {
            style: {
                backgroundColor: 'var(--table-bg-head)',
                color: '#000000',
                fontWeight: 'bold',
                fontSize: '16px',
            },
        },
        cells: {
            style: {
                fontSize: '16px',
                color: '#000000',
            }
        }
    };

    return (
        <DataTable
            className="table table-bordered table-hover"

            customStyles={customStyles}
            columns={columns}
            data={doctors}
            pagination
            paginationPerPage={5}
            paginationRowsPerPageOptions={[5, 10, 15, 20]}
            highlightOnHover
            striped
        />
    )
}