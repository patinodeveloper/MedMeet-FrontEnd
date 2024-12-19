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
import { AppointmentsView } from "../pages/AppointmentsView";
import { AppointmentProvider } from "../context/AppointmentProvider";
import { CardLayout } from "../components/layout/CardLayout";

export const AppRoutes = () => {

    return (
        <>
            <AppointmentProvider>
                <ScheduleProvider>
                    <SpecialtyProvider>
                        <DoctorProvider>
                            <PatientProvider>
                                <Routes>
                                    <Route path="/" element={<HomeView />} />

                                    {/* Páginas con card y encabezado */}
                                    <Route
                                        path="/doctors"
                                        element={
                                            <CardLayout
                                                title="Gestión de Doctores"
                                                icon="fa-user-md"
                                            >
                                                <DoctorsView />
                                            </CardLayout>
                                        }
                                    />
                                    <Route
                                        path="/patients"
                                        element={
                                            <CardLayout
                                                title="Gestión de Pacientes"
                                                icon="fa-procedures"
                                            >
                                                <PatientsView />
                                            </CardLayout>
                                        }
                                    />
                                    <Route
                                        path="/appointments"
                                        element={
                                            <CardLayout
                                                title="Gestión de Citas"
                                                icon="fa-stethoscope"
                                            >
                                                <AppointmentsView />
                                            </CardLayout>
                                        }
                                    />
                                    <Route
                                        path="/specialties"
                                        element={
                                            <CardLayout
                                                title="Gestión de Especialidades"
                                                icon="fa-stethoscope"
                                            >
                                                <SpecialtiesView />
                                            </CardLayout>
                                        }
                                    />
                                    <Route
                                        path="/schedules"
                                        element={
                                            <CardLayout
                                                title="Gestión de Horarios"
                                                icon="fa-stethoscope"
                                            >
                                                <SchedulesView />
                                            </CardLayout>
                                        }
                                    />

                                    {/* Redirección por defecto */}
                                    <Route path="*" element={<Navigate to="/" />} />
                                </Routes>
                            </PatientProvider>
                        </DoctorProvider>
                    </SpecialtyProvider>
                </ScheduleProvider>
            </AppointmentProvider>
        </>
    )
}