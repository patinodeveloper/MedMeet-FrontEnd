import { useContext, useEffect } from "react";
import DataTable from "react-data-table-component"
import { DoctorContext } from "../context/DoctorContext";
import { ActionButtons } from "./ActionButtons";
import { SearchBar } from "./SearchBar";

export const DoctorsList = () => {
    const {
        filteredDoctors,
        searchText,
        setSearchText,
        handlerDoctorSelectedForm,
        handlerRemoveDoctor
    } = useContext(DoctorContext);

    useEffect(() => {
        setSearchText("");
    }, [setSearchText]);

    const columns = [
        { name: "ID", selector: row => row.id, sortable: true, width: "80px" },
        { name: "Nombre", selector: row => row.firstName, sortable: true },
        { name: "Apellidos", selector: row => row.lastName, sortable: true },
        { name: "Correo", selector: row => row.email, sortable: true },
        {
            name: "Especialidad",
            selector: row => row.specialty ? row.specialty.name : 'Sin Especialidad',
            sortable: true,
            width: "160px"
        },
        {
            name: "Acciones",
            cell: doctor => (
                <div className="d-flex justify-content-between gap-2">
                    <ActionButtons
                        item={doctor}
                        handlerEdit={handlerDoctorSelectedForm}
                        handlerRemove={handlerRemoveDoctor}
                    />
                </div>
            ),
            width: "140px"
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
                    placeholder="Buscar doctor..."
                />
            </div>
            <DataTable
                className="table table-bordered table-hover"
                customStyles={customStyles}
                columns={columns}
                data={filteredDoctors}
                pagination
                paginationPerPage={5}
                paginationRowsPerPageOptions={[5, 10, 15, 20]}
                highlightOnHover
                striped
                noDataComponent={
                    filteredDoctors.length === 0 ? 
                    "No se encontraron doctores." : 
                    "Cargando datos..."
                }
            />
        </>
    )
}