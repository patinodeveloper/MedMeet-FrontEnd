
export const ActionButtons = ({ item, handlerEdit, handlerRemove }) => {

    return (
        <div className="d-flex gap-2">
            <button
                className="btn btn-warning"
                onClick={() => handlerEdit(item)}
            >
                <i className="fas fa-edit"></i>
            </button>
            <button
                className="btn btn-danger"
                onClick={() => handlerRemove(item.id)}
            >
                <i className="fas fa-trash"></i>
            </button>
        </div>
    );
};
