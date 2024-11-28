import { useContext } from "react";
import DataTable from "react-data-table-component";
import { PatientContext } from "../context/PatientContext";
import { ActionButtonsPatient } from "./ActionButtonsPatient";

export const PatientsList = () => {
    const { patients = [] } = useContext(PatientContext);

    const columns = [
        { name: "ID", selector: row => row.id, sortable: true, width: "80px" },
        { name: "Nombre", selector: row => row.firstName, sortable: true },
        { name: "Apellidos", selector: row => row.lastName, sortable: true },
        { name: "Edad", selector: row => row.age, sortable: true, width: "100px" },
        { name: "Sexo", selector: row => row.sex, sortable: true, width: "140px" },
        { name: "Teléfono", selector: row => row.phoneNumber, sortable: true, width: "160px" },
        { name: "Dirección", selector: row => row.address, sortable: true, width: "160px" },
        {
            name: "Acciones",
            cell: patient => <ActionButtonsPatient patient={patient} />,
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
            data={patients}
            pagination
            paginationPerPage={5}
            paginationRowsPerPageOptions={[5, 10, 15, 20]}
            highlightOnHover
            striped
        />
    );
};
