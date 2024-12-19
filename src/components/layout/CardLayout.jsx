export const CardLayout = ({ title, icon, children }) => {

    return (
        <div className="container-fluid px-4 my-5">
            <div className="card shadow-lg rounded">
                <div className="card-header bg-primary text-white text-center py-3">
                    <h1 className="fs-3 fw-bold m-0 d-flex align-items-center justify-content-center">
                        <i className={`fas ${icon} me-2`}></i>{title}
                    </h1>
                </div>
                <div className="card-body p-4">
                    {children}
                </div>
            </div>
        </div>
    )
}