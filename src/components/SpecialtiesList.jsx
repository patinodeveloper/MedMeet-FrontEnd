import { useContext } from "react";
import DataTable from "react-data-table-component";
import { SpecialtyContext } from "../context/SpecialtyContext";
import { ActionButtonsSpecialty } from "./ActionButtonsSpecialty";

export const SpecialtiesList = () => {
    const { specialties = [] } = useContext(SpecialtyContext);

    const columns = [
        { name: "ID", selector: row => row.id, sortable: true, width: "100px" },
        { name: "Especialidad", selector: row => row.name, sortable: true },
        {
            name: "Acciones",
            cell: specialty => <ActionButtonsSpecialty specialty={specialty} />,
            width: "150px",
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
        },
    };

    return (
        <DataTable
            className="table table-bordered table-hover"
            customStyles={customStyles}
            columns={columns}
            data={specialties}
            pagination
            paginationPerPage={5}
            paginationRowsPerPageOptions={[5, 10, 15, 20]}
            highlightOnHover
            striped
        />
    );
};

