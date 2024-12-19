import { useContext, useEffect } from "react";
import DataTable from "react-data-table-component";
import { PatientContext } from "../context/PatientContext";
import { SearchBar } from "./SearchBar";
import { ActionButtons } from "./ActionButtons";

export const PatientsList = () => {
    const {
        filteredPatients,
        searchText,
        setSearchText,
        handlerPatientSelectedForm,
        handlerRemovePatient
    } = useContext(PatientContext);

    useEffect(() => {
        setSearchText("");
    }, [setSearchText]);

    const columns = [
        { name: "ID", selector: row => row.id, sortable: true, width: "80px" },
        { name: "Nombre", selector: row => row.firstName, sortable: true, width: "230px" },
        { name: "Apellidos", selector: row => row.lastName, sortable: true, width: "230px" },
        { name: "Edad", selector: row => row.age, sortable: true, width: "100px" },
        { name: "Sexo", selector: row => row.sex, sortable: true, width: "140px" },
        { name: "Teléfono", selector: row => row.phoneNumber, sortable: true, width: "160px" },
        { name: "Dirección", selector: row => row.address, sortable: true },
        {
            name: "Acciones",
            cell: patient =>
                <ActionButtons
                    item={patient}
                    handlerEdit={handlerPatientSelectedForm}
                    handlerRemove={handlerRemovePatient}
                />,
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
        <>
            <div className="mb-3 d-flex justify-content-between align-items-center">
                <SearchBar
                    value={searchText}
                    onChange={setSearchText}
                    placeholder="Buscar paciente..."
                />
            </div>
            <DataTable
                className="table table-bordered table-hover"
                customStyles={customStyles}
                columns={columns}
                data={filteredPatients}
                pagination
                paginationPerPage={5}
                paginationRowsPerPageOptions={[5, 10, 15, 20]}
                highlightOnHover
                striped
            />
        </>
    );
};
