import { useContext, useEffect } from "react";
import DataTable from "react-data-table-component";
import { ScheduleContext } from "../context/ScheduleContext";
import { ActionButtons } from "./ActionButtons";
import { SearchBar } from "./SearchBar";

export const SchedulesList = () => {
    const {
        filteredSchedules,
        searchText,
        setSearchText,
        handlerScheduleSelectedForm,
        handlerRemoveSchedule
    } = useContext(ScheduleContext);

    useEffect(() => {
        setSearchText("");
    }, [setSearchText]);

    const columns = [
        { name: "ID", selector: row => row.id, sortable: true, width: "80px" },
        {
            name: "Doctor",
            selector: row => `${row.doctor.firstName} ${row.doctor.lastName}`,
            sortable: true,
            width: "280px"
        },
        { name: "Día", selector: row => row.day, sortable: true },
        { name: "Hora Inicio", selector: row => row.startTime, sortable: true },
        { name: "Hora Fin", selector: row => row.endTime, sortable: true, width: "150px" },
        {
            name: "Acciones",
            cell: schedule => (
                <ActionButtons
                    item={schedule}
                    handlerEdit={handlerScheduleSelectedForm}
                    handlerRemove={handlerRemoveSchedule}
                />
            ),
            width: "170px"
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
                    placeholder="Buscar horario..."
                />
            </div>
            <DataTable
                className="table table-bordered table-hover"
                customStyles={customStyles}
                columns={columns}
                data={filteredSchedules}
                pagination
                paginationPerPage={5}
                paginationRowsPerPageOptions={[5, 10, 15, 20]}
                highlightOnHover
                striped
                noDataComponent={
                    filteredSchedules.length === 0 ? 
                    "No se encontraron doctores." : 
                    "Cargando datos..."
                }
            />
        </>
    );
};
