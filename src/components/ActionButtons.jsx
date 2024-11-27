export const ActionButtons = () => {

    return (
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
    )
}