import { useContext, useEffect } from "react";
import DataTable from "react-data-table-component";
import { SpecialtyContext } from "../context/SpecialtyContext";
import { ActionButtons } from "./ActionButtons";
import { SearchBar } from "./SearchBar";

export const SpecialtiesList = () => {
    const {
        filteredSpecialties,
        searchText,
        setSearchText,
        handlerSpecialtySelectedForm,
        handlerRemoveSpecialty
    } = useContext(SpecialtyContext);

    useEffect(() => {
        setSearchText("");
    }, [setSearchText]);

    const columns = [
        { name: "ID", selector: row => row.id, sortable: true, width: "100px" },
        { name: "Especialidad", selector: row => row.name, sortable: true },
        {
            name: "Acciones",
            cell: specialty => <ActionButtons
                item={specialty}
                handlerEdit={handlerSpecialtySelectedForm}
                handlerRemove={handlerRemoveSpecialty}
            />,
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
        <>
            <div className="mb-3 d-flex justify-content-between align-items-center">
                <SearchBar
                    value={searchText}
                    onChange={setSearchText}
                    placeholder="Buscar especialidad..."
                />
            </div>
            <DataTable
                className="table table-bordered table-hover"
                customStyles={customStyles}
                columns={columns}
                data={filteredSpecialties}
                pagination
                paginationPerPage={5}
                paginationRowsPerPageOptions={[5, 10, 15, 20]}
                highlightOnHover
                striped
            />
        </>
    );
};

