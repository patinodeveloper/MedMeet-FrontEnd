import { useContext, useEffect } from "react";
import DataTable from "react-data-table-component";
import { AppointmentContext } from "../context/AppointmentContext";
import { ActionButtons } from "./ActionButtons";
import { SearchBar } from "./SearchBar";

export const AppointmentsList = () => {
    const {
        filteredAppointments,
        searchText,
        setSearchText,
        handlerRemoveAppointment,
        handlerAppointmentSelectedForm
    } = useContext(AppointmentContext);

    useEffect(() => {
        setSearchText("");
    }, [setSearchText]);

    const columns = [
        { name: "ID", selector: row => row.id, sortable: true, width: "70px" },
        {
            name: "Paciente",
            selector: row => `${row.patient.firstName} ${row.patient.lastName}`,
            sortable: true
        },
        {
            name: "Doctor",
            selector: row => `${row.doctor.firstName} ${row.doctor.lastName}`,
            sortable: true
        },
        {
            name: "Consultorio",
            selector: row => row.doctor.specialty.name,
            sortable: true,
            width: "140px"
        },
        { name: "Fecha", selector: row => row.date, sortable: true, width: "140px" },
        { name: "Hora Inicio", selector: row => row.startTime, sortable: true, width: "140px" },
        { name: "Hora Fin", selector: row => row.endTime, sortable: true, width: "130px" },
        { name: "Estatus", selector: row => row.status, sortable: true, width: "140px" },
        {
            name: "Acciones",
            cell: appointment => (
                <div className="d-flex justify-content-between gap-2">
                    <ActionButtons
                        item={appointment}
                        handlerEdit={handlerAppointmentSelectedForm}
                        handlerRemove={handlerRemoveAppointment}
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
                data={filteredAppointments}
                pagination
                paginationPerPage={5}
                paginationRowsPerPageOptions={[5, 10, 15, 20]}
                highlightOnHover
                striped
                noDataComponent="No se encontraron citas con ese criterio"
            />
        </>
    );
};
