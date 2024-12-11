import { Navigate, Route, Routes } from "react-router-dom";
import { DoctorsView } from "../pages/DoctorsView";
import { DoctorProvider } from "../context/DoctorProvider";
import { HomeView } from "../pages/HomeView";
import { PatientsView } from "../pages/PatientsView";
import { PatientProvider } from "../context/PatientProvider";
import { SpecialtiesView } from "../pages/SpecialtiesView";
import { SpecialtyProvider } from "../context/SpecialtyProvider";
import { SchedulesDocView } from "../pages/SchedulesDocView";
import { ScheduleProvider } from "../context/ScheduleProvider";
import { SchedulesView } from "../pages/SchedulesView";

export const AppRoutes = () => {

    return (
        <>
            <ScheduleProvider>
                <SpecialtyProvider>
                    <DoctorProvider>
                        <PatientProvider>
                            <Routes>
                                <Route path="/" element={<HomeView />} />

                                {/* Página de doctores: con card y encabezado */}
                                <Route
                                    path="/doctors"
                                    element={
                                        <div className="container my-5">
                                            <div className="card shadow-lg rounded">
                                                <div className="card-header bg-primary text-white text-center py-3">
                                                    <h1 className="fs-3 fw-bold m-0 d-flex align-items-center justify-content-center">
                                                        <i className="fas fa-user-md me-2"></i>Gestión de Doctores
                                                    </h1>
                                                </div>
                                                <div className="card-body p-4">
                                                    <DoctorsView />
                                                </div>
                                            </div>
                                        </div>
                                    }
                                />
                                <Route
                                    path="/patients"
                                    element={
                                        <div className="container my-5">
                                            <div className="card shadow-lg rounded">
                                                <div className="card-header bg-primary text-white text-center py-3">
                                                    <h1 className="fs-3 fw-bold m-0 d-flex align-items-center justify-content-center">
                                                        <i className="fas fa-procedures me-3"></i>Gestión de Pacientes
                                                    </h1>
                                                </div>
                                                <div className="card-body p-4">
                                                    <PatientsView />
                                                </div>
                                            </div>
                                        </div>
                                    }
                                />
                                <Route
                                    path="/specialties"
                                    element={
                                        <div className="container my-5">
                                            <div className="card shadow-lg rounded">
                                                <div className="card-header bg-primary text-white text-center py-3">
                                                    <h1 className="fs-3 fw-bold m-0 d-flex align-items-center justify-content-center">
                                                        <i className="fas fa-stethoscope me-3"></i>Gestión de Especialidades
                                                    </h1>
                                                </div>
                                                <div className="card-body p-4">
                                                    <SpecialtiesView />
                                                </div>
                                            </div>
                                        </div>
                                    }
                                />
                                <Route
                                    path="/schedules"
                                    element={
                                        <div className="container my-5">
                                            <div className="card shadow-lg rounded">
                                                <div className="card-header bg-primary text-white text-center py-3">
                                                    <h1 className="fs-3 fw-bold m-0 d-flex align-items-center justify-content-center">
                                                        <i className="fas fa-stethoscope me-3"></i>Gestión de Horarios
                                                    </h1>
                                                </div>
                                                <div className="card-body p-4">
                                                    <SchedulesView />
                                                </div>
                                            </div>
                                        </div>
                                    }
                                />

                                {/* Redirección por defecto */}
                                <Route path="*" element={<Navigate to="/" />} />
                            </Routes>
                        </PatientProvider>
                    </DoctorProvider>
                </SpecialtyProvider>
            </ScheduleProvider>
        </>
    )
}