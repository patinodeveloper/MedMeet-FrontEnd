import { Navigate, Route, Routes } from "react-router-dom";
import { DoctorsView } from "../pages/DoctorsView";
import { MainNavBar } from "../components/layout/MainNavBar";
import { DoctorProvider } from "../context/DoctorProvider";
import { HomeView } from "../pages/HomeView";
import { SpecialtyProvider } from "../context/SpecialtyProvider";

export const DoctorRoutes = () => {

    return (
        <>
            <SpecialtyProvider>
                <DoctorProvider>
                    <Routes>
                        <Route path="/" element={<HomeView />} />

                        {/* Página de doctores: con card y encabezado */}
                        <Route
                            path="/doctors"
                            element={
                                <div className="card shadow-sm mb-5 rounded my-3">
                                    <div className="card-header bg-primary text-white">
                                        <h1 className="fs-4 text-center">Lista de Doctores</h1>
                                    </div>
                                    <div className="card-body">
                                        <DoctorsView />
                                    </div>
                                </div>
                            }
                        />

                        {/* Redirección por defecto */}
                        <Route path="*" element={<Navigate to="/" />} />
                    </Routes>
                </DoctorProvider>
            </SpecialtyProvider>
        </>
    )
}