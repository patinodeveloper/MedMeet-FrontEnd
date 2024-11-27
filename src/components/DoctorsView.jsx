import { useState, useEffect } from "react";
import { getDoctors } from "../api/services/doctorServices";
import DataTable from "react-data-table-component";
import '@fortawesome/fontawesome-free/css/all.min.css';

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

    // Columnas para DataTable
    const columns = [
        {
            name: "ID",
            selector: (row) => row.id,
            sortable: true,
            width: "80px",
        },
        {
            name: "Nombre",
            selector: (row) => row.firstName,
            sortable: true,
        },
        {
            name: "Apellidos",
            selector: (row) => row.lastName,
            sortable: true,
        },
        {
            name: "Correo",
            selector: (row) => row.email,
            sortable: true,
            width: "280px",
        },
        {
            name: "Especialidad",
            selector: (row) => row.specialty.name,
            sortable: true,
            width: "160px",
        },
        {
            name: "Acciones",
            cell: (row) => (
                <div className="d-flex gap-2">
                    <button
                        className="btn btn-warning"
                        onClick={() => onEdit(row)}
                    >
                        <i className="fas fa-edit"></i>
                    </button>
                    <button
                        className="btn btn-danger"
                        onClick={() => onDelete(row)}
                    >
                        <i className="fas fa-trash"></i>
                    </button>
                </div>
            ),
            width: "130px",
        },
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
        <>
            {isLoading ? (
                <div className="alert alert-info">Cargando...</div>
            ) : (
                <>
                    <h3 className="fs-5">{title}</h3>
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
                </>
            )}
        </>
    );
};
