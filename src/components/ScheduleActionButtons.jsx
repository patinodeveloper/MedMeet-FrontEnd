export const ScheduleActionButtons = ({ doctor, handlerOpenForm, handlerViewSchedules }) => {
    return (
        <div className="d-flex gap-2">
            <button
                className="btn btn-success"
                onClick={() => handlerOpenForm(doctor)}
            >
                <i className="fas fa-plus"></i> 
            </button>
            <button
                className="btn btn-secondary"
                onClick={() => handlerViewSchedules(doctor)}
            >
                <i className="fas fa-eye"></i>
            </button>
        </div>
    );
};
