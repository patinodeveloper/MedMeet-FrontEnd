import { DoctorsView } from "./components/DoctorsView";
import { FooterView } from "./components/FooterView";
import { MainNavBar } from "./components/MainNavBar";
import { DoctorProvider } from "./context/DoctorProvider";
import { SpecialtyProvider } from "./context/SpecialtyProvider";

export const MedMeetApp = () => {

    return (
        <>
            <header>
                <MainNavBar />
            </header>

            <div className="container">

                <div className="card shadow-sm mb-5 rounded my-3">

                    <div className="card-header bg-primary text-white">
                        <h1 className="fs-4 text-center">Lista de Doctores</h1>
                    </div>

                    <div className="card-body">
                        <SpecialtyProvider>
                            <DoctorProvider>
                                <DoctorsView title={"Datos de los doctores"} />
                            </DoctorProvider>
                        </SpecialtyProvider>
                    </div>

                </div>
            </div>

            <FooterView />
        </>
    );
}
