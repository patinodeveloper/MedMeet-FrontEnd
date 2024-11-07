import { DoctorsView } from "./components/DoctorsView";
import { FooterView } from "./components/FooterView";
import { MainNavBar } from "./components/MainNavBar";

export const MedMeetApp = () => {

    return (
        <>
            <div className="container">
                <MainNavBar />

                <div className="card shadow-sm mb-5 rounded my-3">
                    
                    <div className="card-header bg-primary text-white">
                        <h1 className="fs-4 text-center">Lista de Doctores</h1>
                    </div>

                    <div className="card-body">
                        <DoctorsView title={"Datos de los doctores"} />
                    </div>

                </div>
            </div>

            <FooterView />
        </>
    );
}
